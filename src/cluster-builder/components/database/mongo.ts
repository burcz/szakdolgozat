import KubernetesClient from "../../clients/k8s-clients/KubernetesClient";
import * as mongoTemplates from '../../templates/database/mongoTemplates';

async function setup(k8sClient: KubernetesClient): Promise<void> {
	await k8sClient.createNameSpace(mongoTemplates.namespace);
	await k8sClient.createService(mongoTemplates.namespace, mongoTemplates.service);
	await k8sClient.createStatefulset(mongoTemplates.namespace, mongoTemplates.statefulSet);
	await k8sClient.createClusterRole(mongoTemplates.clusterRole);
	await k8sClient.createServiceAccount(mongoTemplates.namespace, mongoTemplates.serviceAccount);
	await k8sClient.createClusterRoleBinding(mongoTemplates.clusterRoleBinding);
	await k8sClient.createDaemonSet(mongoTemplates.namespace, mongoTemplates.daemonSet);
}

export {
	setup
};