import { V1StatefulSet, V1Namespace, V1Service } from "@kubernetes/client-node";

const namespace: V1Namespace = {
	metadata: {
		name: 'frontend'
	}
};

const service: V1Service = {
	metadata: {
		name: 'frontend',
		labels: {
			name: 'frontend'
		}
	},
	spec: {
		ports: [
			{
				port: 8080
			}
		],
		clusterIP: 'None',
		selector: {
			role: 'frontend'
		}
	}
};

const loadBalancer: V1Service = {
	metadata: {
		name: 'frontend-lb',
		labels: {
			name: 'frontend-lb'
		}
	},
	spec: {
		ports: [
			{
				port: 8080
			}
		],
		type: 'LoadBalancer',
		selector: {
			role: 'frontend'
		}
	}
};

const statefulSet: V1StatefulSet = {
	metadata: {
		name: "frontend"
	},
	spec: {
		serviceName: "frontend",
		replicas: 1,
		selector: {
			matchLabels: {
				role: "frontend"
			}
		},
		template: {
			metadata: {
				labels: {
					role: 'frontend'
				}
			},
			spec: {
				terminationGracePeriodSeconds: 10,
				nodeSelector: {
					'cloud.google.com/gke-nodepool': "frontend"
				},
				containers: [
					{
						name: 'frontend',
						image: 'eu.gcr.io/cluster-builder-test/frontend:test',
						ports: [
							{
								containerPort: 8080
							}
						]
					}
				]
			}
		}
	}
};

export {
	namespace,
	service,
	loadBalancer,
	statefulSet
};