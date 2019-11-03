import ClusterManagerClient from './clients/google-clients/ClusterManagerClient';
import KubernetesClient from './clients/k8s-clients/KubernetesClient';

import * as config from '../config.json';
import * as mongoTemplates from './templates/mongoTemplates';

async function main() {
	try {
		const containerClient = new ClusterManagerClient();
		await containerClient.init();

		await containerClient.createCluster({
			cluster: config.clusterBuilderOptions.cluster,
			parent: 'projects/' + containerClient.projectId + '/locations/' + config.clusterBuilderOptions.location
		});

		await containerClient.waitForClusterCreation();

		const k8sClient = new KubernetesClient();
		await k8sClient.init();

		const namespace = await k8sClient.createNameSpace(mongoTemplates.namespace);
		const service = await k8sClient.createService(mongoTemplates.namespace, mongoTemplates.service);
		const statefulset = await k8sClient.createStatefulset(mongoTemplates.namespace, mongoTemplates.statefulset);
		const clusterRole = await k8sClient.createClusterRole(mongoTemplates.clusterRole);
		const serviceAccount = await k8sClient.createServiceAccount(mongoTemplates.namespace, mongoTemplates.serviceAccount);
		const clusterRoleBinding = await k8sClient.createClusterRoleBinding(mongoTemplates.clusterRoleBinding);

		console.log(JSON.stringify([
			namespace,
			service,
			statefulset,
			clusterRole,
			serviceAccount,
			clusterRoleBinding
		]));
		console.log('done');

	}
	catch (err) {
		console.log(JSON.stringify(err, null, 2));
	}
}

main();
