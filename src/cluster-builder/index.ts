import ClusterManagerClient from './clients/google-clients/ClusterManagerClient';
import KubernetesClient from './clients/k8s-clients/KubernetesClient';

import * as config from '../config.json';
import * as mongoTemplates from './templates/mongoTemplates';
import * as mgobTemplates from './templates/mgobTemplates';
import * as storageTemplate from './templates/storageTemplate';

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

		const ssdStorage = await k8sClient.createStorage(storageTemplate.ssd);
		const hddStorage = await k8sClient.createStorage(storageTemplate.hdd);

		const mongoNamespace = await k8sClient.createNameSpace(mongoTemplates.namespace);
		const mongoService = await k8sClient.createService(mongoTemplates.namespace, mongoTemplates.service);
		const mongoStatefulset = await k8sClient.createStatefulset(mongoTemplates.namespace, mongoTemplates.statefulSet);
		const mongoClusterRole = await k8sClient.createClusterRole(mongoTemplates.clusterRole);
		const mongoServiceAccount = await k8sClient.createServiceAccount(mongoTemplates.namespace, mongoTemplates.serviceAccount);
		const mongoClusterRoleBinding = await k8sClient.createClusterRoleBinding(mongoTemplates.clusterRoleBinding);
		const mongoDaemonSet = await k8sClient.createDaemonSet(mongoTemplates.namespace, mongoTemplates.daemonSet);

		const mgobConfigMap = await k8sClient.createConfigMap(mongoTemplates.namespace, mgobTemplates.configMap);
		const mgobService = await k8sClient.createService(mongoTemplates.namespace, mgobTemplates.service);
		const mgobStatefulSet = await k8sClient.createStatefulset(mongoTemplates.namespace, mgobTemplates.statefulSet);


		console.log([
			mongoNamespace,
			mongoService,
			mongoStatefulset,
			mongoClusterRole,
			mongoServiceAccount,
			mongoClusterRoleBinding,
			mongoDaemonSet,
			mgobConfigMap,
			mgobService,
			mgobStatefulSet,
			ssdStorage,
			hddStorage
		].map(item => {
			return JSON.stringify(item, null, 2);
		}).join(",\n"));
		console.log('done');

	}
	catch (err) {
		console.log(JSON.stringify(err, null, 2));
	}
}

main();
