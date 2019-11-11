import KubernetesClient from '../../clients/k8s-clients/KubernetesClient';
import * as storageTemplate from '../../templates/database/storageTemplate';

async function setup(k8sClient: KubernetesClient): Promise<void> {
	await k8sClient.createStorageClass(storageTemplate.ssd);
	await k8sClient.createStorageClass(storageTemplate.hdd);
}

export {
	setup
};