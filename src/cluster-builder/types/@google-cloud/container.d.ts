declare type Operation = import ("google-gax").Operation;

declare module "@google-cloud/container" {
	const ClusterManagerClient: ClusterManagerClientConstructor;
	export {
		ClusterManagerClient
	};
}

interface IClusterManagerClient {
	init(): Promise<void>;
	getProjectId(): Promise<string>;
	createCluster(
		request: ClusterRequest
	): Promise<[Operation]>;
	listClusters(
		options: {
			projectId: string;
			zone: string;
		}
	): Promise<[IListClusterResult]>;
	getCluster(clusterName: string): Promise<ICluster>;
}

interface ClusterManagerClientConstructor {
	new(options: { keyFilename: string }): IClusterManagerClient;
}

interface ClusterRequest {
	cluster: {
		name: string;
		nodeConfig?: NodeConfig;
		nodePools?: NodePool[];
	};
	parent?: string;
}

interface NodeConfig {
	machineType: string;
	diskSizeGb: number;
	oauthScopes: string[];
	labels?: [string, string][];
}

interface NodePool {
	name: string;
	config: NodeConfig;
	initialNodeCount: number;
	autoScaling: NodePoolAutoscaling;
}

interface NodePoolAutoscaling {
	enabled: boolean;
	minNodeCount: number;
	maxNodeCount: number;
}

interface IMasterAuthData {
	username: string;
	password: string;
	clientKey: string;
	clientCertificate: string;
	clusterCaCertificate: string;
}

interface IListClusterResult {
	clusters: ICluster[];
}

interface ICluster {
	name: string;
	endpoint: string;
	status: string;
	masterAuth: IMasterAuthData;
}

declare enum CLUSTERSTATUS {
	STATUS_UNSPECIFIED,
	PROVISIONING,
	RUNNING,
	RECONCILING,
	STOPPING,
	ERROR,
	DEGRADED
}
