import ClusterManagerClient from "../../clients/google-clients/ClusterManagerClient";
import * as config from '../../../config.json';
import KubernetesClient from "../../clients/k8s-clients/KubernetesClient";

async function setup(): Promise<KubernetesClient> {
	const clusterManagerClient = new ClusterManagerClient();
	await clusterManagerClient.init();

	await clusterManagerClient.createCluster({
		cluster: config.clusterBuilderOptions.cluster,
		parent: 'projects/' + clusterManagerClient.projectId + '/locations/' + config.clusterBuilderOptions.location
	});

	await clusterManagerClient.waitForClusterCreation();

	const k8sClient = new KubernetesClient();
	await k8sClient.init(clusterManagerClient);
	return k8sClient;
}

export {
	setup
};