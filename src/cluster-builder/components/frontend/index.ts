import * as frontendTemplates from '../../templates/frontend/frontendTemplates';
import KubernetesClient from '../../clients/k8s-clients/KubernetesClient';

async function setup(k8sClient: KubernetesClient) {
	await k8sClient.createNameSpace(frontendTemplates.namespace);
	await k8sClient.createService(frontendTemplates.namespace, frontendTemplates.service);
	await k8sClient.createService(frontendTemplates.namespace, frontendTemplates.loadBalancer);
	await k8sClient.createStatefulset(frontendTemplates.namespace, frontendTemplates.statefulSet);
}

export {
	setup
};