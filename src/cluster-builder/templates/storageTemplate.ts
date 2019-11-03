import { V1StorageClass } from "@kubernetes/client-node";

const ssd: V1StorageClass = {
	metadata: {
		name: 'ssd'
	},
	provisioner: 'kubernetes.io/gce-pd',
	parameters: {
		type: 'pd-ssd'
	}
};

const hdd: V1StorageClass = {
	metadata: {
		name: 'ssd'
	},
	provisioner: 'kubernetes.io/gce-pd',
	parameters: {
		type: 'pd-standard'
	}
};

export {
	ssd,
	hdd
};