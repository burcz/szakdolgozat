import * as apiTemplates from '../../templates/api/apiTemplates';
import KubernetesClient from '../../clients/k8s-clients/KubernetesClient';

async function setup(k8sClient: KubernetesClient) {
	await k8sClient.createNameSpace(apiTemplates.namespace);
	await k8sClient.createService(apiTemplates.namespace, apiTemplates.service);
	await k8sClient.createStatefulset(apiTemplates.namespace, apiTemplates.statefulSet);
}

export {
	setup
};