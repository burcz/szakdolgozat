import * as container from '@google-cloud/container';
import { Operation } from 'google-gax';
import { google } from 'googleapis';
import { promisify } from 'util';
import logger from '../../utils/logger';

import * as config from '../../../config.json';

const cloudResourceManager = google.cloudresourcemanager('v1');
const sleep = promisify(setTimeout);

class ClusterManagerClient {
	client: IClusterManagerClient;
	projectId: string;
	clusterName: string;

	constructor() {
		this.client = new container.ClusterManagerClient({ keyFilename: config.clusterBuilderOptions.googleApplicationCredentials });
	}

	async init(projectId?: string): Promise<void> {
		this.projectId = projectId || await this.getProjectId();
		this.clusterName = config.clusterBuilderOptions.cluster.name;
	}

	async createCluster(request: ClusterRequest): Promise<[Operation]> {
		logger.info(`Creating cluster [${ request.cluster.name }]`);
		return await this.client.createCluster(request);
	}

	async getProjectId(): Promise<string> {
		return await this.client.getProjectId();
	}

	async getClusterEndpoint(): Promise<string> {
		const clusters: ICluster[] = await this.listClusters();

		for (const cluster of clusters) {
			if (cluster.name === this.clusterName) {
				return cluster.endpoint;
			}
		}
		throw new Error('getClusterEndpoint error: ' + this.clusterName + ' is not found.');
	}

	async getClusterMasterAuth(): Promise<IMasterAuthData> {
		const clusters: ICluster[] = await this.listClusters();

		for (const cluster of clusters) {
			if (cluster.name === this.clusterName) {
				return cluster.masterAuth;
			}
		}
		throw new Error('getClusterMasterAuth error: ' + this.clusterName + ' is not found.');
	}

	async listClusters(): Promise<ICluster[]> {
		const responses = await this.client.listClusters({
			projectId: this.projectId,
			zone: '-'
		});
		return responses[0].clusters;
	}

	async waitForLongRunningOperation(operation: Operation): Promise<void> {
		const authClient = await google.auth.getClient({
			scopes: ['https://www.googleapis.com/auth/cloud-platform'],
			keyFilename: config.clusterBuilderOptions.googleApplicationCredentials
		});
		const request = {
			name: 'operations/' + operation.name,
			auth: authClient
		};

		if (operation) {
			while (true) { //TODO timeout
				const status = await cloudResourceManager.operations.get(request);
				console.log(status);
				await sleep(1000);
			}
		}
	}

	async getCluster(clusterName: string): Promise<ICluster> {
		const clusters = await this.listClusters();
		const matchingCluster = clusters.filter(cluster => cluster.name === clusterName);
		if (matchingCluster.length === 1) {
			return matchingCluster[0];
		}
		else {
			throw new Error('Cannot find cluster ' + clusterName);
		}
	}

	async waitForClusterCreation() {
		let cluster = await this.getCluster(config.clusterBuilderOptions.cluster.name);
		logger.info(`Waiting for cluster creation [${ cluster.name }]`);
		while (cluster.status !== "RUNNING") { // TODO: timeout
			await sleep(5000);
			logger.info(`Cluster still creating... Status: ${ cluster.status }`);
			cluster = await this.getCluster(config.clusterBuilderOptions.cluster.name);
		}
		if (cluster.status === "RUNNING") {
			logger.info(`Cluster creation finished [${ cluster.name }]`);
		}
	}

}

export default ClusterManagerClient;