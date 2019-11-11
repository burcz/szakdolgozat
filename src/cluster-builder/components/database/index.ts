import * as mongo from './mongo';
import * as mgob from './mgob';
import * as storage from './storage';
import KubernetesClient from '../../clients/k8s-clients/KubernetesClient';

async function setup(k8sClient: KubernetesClient): Promise<void> {
	await storage.setup(k8sClient);
	await mongo.setup(k8sClient);
	await mgob.setup(k8sClient);
}

export {
	setup
};