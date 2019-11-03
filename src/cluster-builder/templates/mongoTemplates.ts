import { V1StatefulSet, V1Service, V1ClusterRole, V1ServiceAccount, V1ClusterRoleBinding, V1Namespace } from "@kubernetes/client-node";

const namespace: V1Namespace = {
	metadata: {
		name: 'db'
	}
};

const service: V1Service  = {
	metadata: {
		name: 'mongo',
		labels: {
			name: 'mongo'
		}
	},
	spec: {
		ports: [
			{
				port: 27017
			}
		],
		selector: {
			role: 'mongo'
		}
	}
};

const statefulset: V1StatefulSet = {
	metadata: {
		name: "mongo"
	},
	spec: {
		serviceName: "mongo",
		replicas: 3,
		selector: {
			matchLabels: {
				role: "mongo"
			}
		},
		template: {
			metadata: {
				labels: {
					role: 'mongo'
				}
			},
			spec: {
				terminationGracePeriodSeconds: 10,
				containers: [
					{
						name: 'mongod',
						image: 'mongo:3.6',
						command: [
							'--replSet',
							'rs0',
							'--bind-ip',
							'0.0.0.0',
							'--smallfiles',
							'--noprealloc'
						],
						ports: [
							{
								containerPort: 27017
							}
						],
						volumeMounts: [
							{
								name: 'mongo-storage',
								mountPath: '/data/db'
							}
						]
					},
					{
						name: 'mongo-sidecar',
						image: 'cvallance/mongo-k8s-sidecar',
						env: [
							{
								name: 'MONGO_SIDECAR_POD_LABELS',
								value: 'role=mongo'
							},
							{
								name: 'KUBE_NAMESPACE',
								value: 'db'
							}
						]
					}
				]
			}
		},
		volumeClaimTemplates: [
			{
				metadata: {
					name: 'mongo-storage',
					annotations: {
						'volume.beta.kubernetes.io/storage-class': 'ssd'
					}
				},
				spec: {
					accessModes: [
						'ReadWriteOnce'
					],
					resources: {
						requests: {
							storage: '1Gi'
						}
					}
				}
			}
		]
	}
};

const clusterRole: V1ClusterRole = {
	metadata: {
		name: 'mongo'
	},
	rules: [
		{
			apiGroups: [
				''
			],
			resources: [
				'pods',
				'services',
				'endpoints'
			],
			verbs: [
				'get',
				'list',
				'watch'
			]
		}
	]
};

const serviceAccount: V1ServiceAccount = {
	metadata: {
		name: 'mongo'
	}
};

const clusterRoleBinding: V1ClusterRoleBinding = {
	metadata: {
		name: 'system:serviceaccount:db:mongo'
	},
	roleRef: {
		apiGroup: 'rbac.authorization.k8s.io',
		kind: 'ClusterRole',
		name: 'mongo'
	},
	subjects: [
		{
			kind: 'ServiceAccount',
			name: 'mongo',
			namespace: 'db'
		}
	]
};

export {
	namespace,
	service,
	statefulset,
	clusterRole,
	serviceAccount,
	clusterRoleBinding
};