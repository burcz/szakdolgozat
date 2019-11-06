import * as k8s from '@kubernetes/client-node';
import ClusterManagerClient from '../google-clients/ClusterManagerClient';
import { Cluster } from '@kubernetes/client-node/dist/config_types';
import logger from '../../utils/logger';

class KubernetesClient {
	coreV1Api: k8s.CoreV1Api;
	appsV1Api: k8s.AppsV1Api;
	rbacAuthorizationV1Api: k8s.RbacAuthorizationV1Api;
	storageV1Api: k8s.StorageV1Api;

	async init(clusterManagerClient: ClusterManagerClient) {
		const kc = new k8s.KubeConfig();
		await clusterManagerClient.init();

		const clusterEndpoint = await clusterManagerClient.getClusterEndpoint();
		const clusterCredentials = await clusterManagerClient.getClusterMasterAuth();

		const cluster: Cluster = {
			name: clusterManagerClient.clusterName,
			server: 'https://' + clusterEndpoint,
			skipTLSVerify: true
		};

		const user = {
			name: clusterCredentials.username,
			username: clusterCredentials.username,
			password: clusterCredentials.password
		};

		kc.loadFromClusterAndUser(cluster, user);
		this.coreV1Api = kc.makeApiClient(k8s.CoreV1Api);
		this.appsV1Api = kc.makeApiClient(k8s.AppsV1Api);
		this.rbacAuthorizationV1Api = kc.makeApiClient(k8s.RbacAuthorizationV1Api);
		this.storageV1Api = kc.makeApiClient(k8s.StorageV1Api);
	}

	async handleConflict(promise: Promise<any>): Promise<any> {
		try {
			return await promise;
		}
		catch (err) {
			if (err.response) {
				if (err.response.statusCode === 409) {
					return {
						result: {
							body: {}
						}
					};
				}
			}
			throw err;
		}
	}

	async createNameSpace(namespace: k8s.V1Namespace): Promise<k8s.V1Namespace> {
		logger.info(`Creating namespace ${ this.getComponentName(namespace) }`);
		const result = await this.handleConflict(
			this.coreV1Api.createNamespace(namespace)
		);
		return result.body;
	}

	getComponentName(component: any): string {
		if (component.metadata) {
			if (component.metadata.name) {
				return component.metadata.name;
			}
			else {
				throw new ComponentNameMissingError(component);
			}
		}
		else {
			throw new ComponentNameMissingError(component);
		}
	}

	async createService(namespace: k8s.V1Namespace, service: k8s.V1Service): Promise<k8s.V1Service> {
		logger.info(`Creating service ${ this.getComponentName(service) }`);
		const namespaceName = this.getComponentName(namespace);
		const result = await this.handleConflict(
			this.coreV1Api.createNamespacedService(namespaceName, service)
		);
		return result.body;
	}

	async createStatefulset(namespace: k8s.V1Namespace, statefulSet: k8s.V1StatefulSet): Promise<k8s.V1StatefulSet> {
		logger.info(`Creating statefulSet ${ this.getComponentName(statefulSet) }`);
		const namespaceName = this.getComponentName(namespace);
		const result = await this.handleConflict(
			this.appsV1Api.createNamespacedStatefulSet(namespaceName, statefulSet)
		);
		return result.body;
	}

	async createClusterRole(clusterRole: k8s.V1ClusterRole): Promise<k8s.V1ClusterRole> {
		logger.info(`Creating clusterRole ${ this.getComponentName(clusterRole) }`);
		const result = await this.handleConflict(
			this.rbacAuthorizationV1Api.createClusterRole(clusterRole)
		);
		return result.body;
	}

	async createServiceAccount(namespace: k8s.V1Namespace, serviceAccount: k8s.V1ServiceAccount): Promise<k8s.V1ServiceAccount> {
		logger.info(`Creating serviceAccount ${ this.getComponentName(serviceAccount) }`);
		const namespaceName = this.getComponentName(namespace);
		const result = await this.handleConflict(
			this.coreV1Api.createNamespacedServiceAccount(namespaceName, serviceAccount)
		);
		return result.body;
	}

	async createClusterRoleBinding(clusterRoleBinding: k8s.V1ClusterRoleBinding): Promise<k8s.V1ClusterRoleBinding> {
		logger.info(`Creating clusterRoleBinding ${ this.getComponentName(clusterRoleBinding) }`);
		const result = await this.handleConflict(
			this.rbacAuthorizationV1Api.createClusterRoleBinding(clusterRoleBinding)
		);
		return result.body;
	}

	async createDaemonSet(namespace: k8s.V1Namespace, daemonSet: k8s.V1DaemonSet): Promise<k8s.V1DaemonSet> {
		logger.info(`Creating daemonSet${ this.getComponentName(daemonSet) }`);
		const namespaceName = this.getComponentName(namespace);
		const result = await this.handleConflict(
			this.appsV1Api.createNamespacedDaemonSet(namespaceName, daemonSet)
		);
		return result.body;
	}

	async createConfigMap(namespace: k8s.V1Namespace, configMap: k8s.V1ConfigMap): Promise<k8s.V1ConfigMap> {
		logger.info(`Creating configMap ${ this.getComponentName(configMap) }`);
		const namespaceName = this.getComponentName(namespace);
		const result = await this.handleConflict(
			this.coreV1Api.createNamespacedConfigMap(namespaceName, configMap)
		);
		return result.body;
	}

	async createDeployment(namespace: k8s.V1Namespace, deployment: k8s.V1Deployment): Promise<k8s.V1Deployment> {
		logger.info(`Creating deployment ${ this.getComponentName(deployment) }`);
		const namespaceName = this.getComponentName(namespace);
		const result = await this.handleConflict(
			this.appsV1Api.createNamespacedDeployment(namespaceName, deployment)
		);
		return result.body;
	}

	async createStorageClass(storageClass: k8s.V1StorageClass): Promise<k8s.V1StorageClass> {
		logger.info(`Creating storageClass ${ this.getComponentName(storageClass) }`);
		const result = await this.handleConflict(
			this.storageV1Api.createStorageClass(storageClass)
		);
		return result.body;
	}
}

class ComponentNameMissingError extends Error {
	constructor(component: { metadata: k8s.V1ObjectMeta }) {
		super();
		this.message = `Given component missing property metadata.name!\n${ JSON.stringify(component, null, 2) }`;
	}
}

export default KubernetesClient;