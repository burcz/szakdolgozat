import * as k8s from '@kubernetes/client-node';
import ClusterManagerClient from '../google-clients/ClusterManagerClient';
import { Cluster } from '@kubernetes/client-node/dist/config_types';

class KubernetesClient {
	coreV1Api: k8s.CoreV1Api;
	appsV1Api: k8s.AppsV1Api;
	rbacAuthorizationV1Api: k8s.RbacAuthorizationV1Api;
	storageV1Api: k8s.StorageV1Api;
	clusterManagerClient: ClusterManagerClient;

	async init() {
		const kc = new k8s.KubeConfig();
		this.clusterManagerClient = new ClusterManagerClient();
		await this.clusterManagerClient.init();

		const clusterEndpoint = await this.clusterManagerClient.getClusterEndpoint();
		const clusterCredentials = await this.clusterManagerClient.getClusterMasterAuth();

		const cluster: Cluster = {
			name: this.clusterManagerClient.clusterName,
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

	async handleConflict(promise: Promise<any>) {
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
		const result = await this.handleConflict(
			this.coreV1Api.createNamespace(namespace)
		);
		return result.body;
	}

	getNamespaceName(namespace: k8s.V1Namespace): string {
		if (namespace.metadata) {
			if (namespace.metadata.name) {
				return namespace.metadata.name;
			}
			else {
				throw new NamespaceNameError(namespace);
			}
		}
		else {
			throw new NamespaceNameError(namespace);
		}
	}

	async createService(namespace: k8s.V1Namespace, service: k8s.V1Service): Promise<k8s.V1Service> {
		const namespaceName = this.getNamespaceName(namespace);
		const result = await this.handleConflict(
			this.coreV1Api.createNamespacedService(namespaceName, service)
		);
		return result.body;
	}

	async createStatefulset(namespace: k8s.V1Namespace, statefulSet: k8s.V1StatefulSet): Promise<k8s.V1StatefulSet> {
		const namespaceName = this.getNamespaceName(namespace);
		const result = await this.handleConflict(
			this.appsV1Api.createNamespacedStatefulSet(namespaceName, statefulSet)
		);
		return result.body;
	}

	async createClusterRole(clusterRole: k8s.V1ClusterRole): Promise<k8s.V1ClusterRole> {
		const result = await this.handleConflict(
			this.rbacAuthorizationV1Api.createClusterRole(clusterRole)
		);
		return result.body;
	}

	async createServiceAccount(namespace: k8s.V1Namespace, serviceAccount: k8s.V1ServiceAccount): Promise<k8s.V1ServiceAccount> {
		const namespaceName = this.getNamespaceName(namespace);
		const result = await this.handleConflict(
			this.coreV1Api.createNamespacedServiceAccount(namespaceName, serviceAccount)
		);
		return result.body;
	}

	async createClusterRoleBinding(clusterRoleBinding: k8s.V1ClusterRoleBinding): Promise<k8s.V1ClusterRoleBinding> {
		const result = await this.handleConflict(
			this.rbacAuthorizationV1Api.createClusterRoleBinding(clusterRoleBinding)
		);
		return result.body;
	}

	async createDaemonSet(namespace: k8s.V1Namespace, daemonSet: k8s.V1DaemonSet): Promise<k8s.V1DaemonSet> {
		const namespaceName = this.getNamespaceName(namespace);
		const result = await this.handleConflict(
			this.appsV1Api.createNamespacedDaemonSet(namespaceName, daemonSet)
		);
		return result.body;
	}

	async createConfigMap(namespace: k8s.V1Namespace, configMap: k8s.V1ConfigMap): Promise<k8s.V1ConfigMap> {
		const namespaceName = this.getNamespaceName(namespace);
		const result = await this.handleConflict(
			this.coreV1Api.createNamespacedConfigMap(namespaceName, configMap)
		);
		return result.body;
	}

	async createDeployment(namespace: k8s.V1Namespace, deployment: k8s.V1Deployment): Promise<k8s.V1Deployment> {
		const namespaceName = this.getNamespaceName(namespace);
		const result = await this.handleConflict(
			this.appsV1Api.createNamespacedDeployment(namespaceName, deployment)
		);
		return result.body;
	}

	async createStorage(storage: k8s.V1StorageClass): Promise<k8s.V1StorageClass> {
		const result = await this.handleConflict(
			this.storageV1Api.createStorageClass(storage)
		);
		return result.body;
	}
}

class NamespaceNameError extends Error {
	constructor(namespace: k8s.V1Namespace) {
		super();
		this.message = "Given namespace missing property metadata.name! " + JSON.stringify(namespace, null, 2);
	}
}

export default KubernetesClient;