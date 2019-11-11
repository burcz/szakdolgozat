import { V1StatefulSet, V1Namespace, V1Service } from "@kubernetes/client-node";

const namespace: V1Namespace = {
	metadata: {
		name: 'api'
	}
};

const service: V1Service = {
	metadata: {
		name: 'api',
		labels: {
			name: 'api'
		}
	},
	spec: {
		ports: [
			{
				port: 3000
			}
		],
		clusterIP: 'None',
		selector: {
			role: 'api'
		}
	}
};

const loadBalancer: V1Service = {
	metadata: {
		name: 'api-lb',
		labels: {
			name: 'api-lb'
		}
	},
	spec: {
		ports: [
			{
				port: 3000
			}
		],
		type: 'LoadBalancer',
		selector: {
			role: 'api'
		}
	}
};

const statefulSet: V1StatefulSet = {
	metadata: {
		name: "api"
	},
	spec: {
		serviceName: "api",
		replicas: 1,
		selector: {
			matchLabels: {
				role: "api"
			}
		},
		template: {
			metadata: {
				labels: {
					role: 'api'
				}
			},
			spec: {
				terminationGracePeriodSeconds: 10,
				nodeSelector: {
					'cloud.google.com/gke-nodepool': "api"
				},
				containers: [
					{
						name: 'api',
						image: 'eu.gcr.io/cluster-builder-test/api:test',
						ports: [
							{
								containerPort: 3000
							}
						],
						env: [
							{
								name: 'DB_HOST',
								value: `mongo.db.svc.cluster.local`
							},
							{
								name: 'DB_NAME',
								value: 'test'
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