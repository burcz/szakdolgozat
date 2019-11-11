import KubernetesClient from "../../clients/k8s-clients/KubernetesClient";
import * as mongoTemplates from '../../templates/database/mongoTemplates';
import * as mgobTemplates from '../../templates/database/mgobTemplates';

async function setup(k8sClient: KubernetesClient): Promise<void> {
	await k8sClient.createConfigMap(mongoTemplates.namespace, mgobTemplates.configMap);
	await k8sClient.createService(mongoTemplates.namespace, mgobTemplates.service);
	await k8sClient.createStatefulset(mongoTemplates.namespace, mgobTemplates.statefulSet);
}

export {
	setup
};