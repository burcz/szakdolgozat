import { V1StatefulSet, V1Service, V1ClusterRole, V1ServiceAccount, V1ClusterRoleBinding, V1Namespace, V1DaemonSet } from "@kubernetes/client-node";

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
		clusterIP: 'None',
		selector: {
			role: 'mongo'
		}
	}
};

const statefulSet: V1StatefulSet = {
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
				nodeSelector: {
					'cloud.google.com/gke-nodepool': "mongo"
				},
				containers: [
					{
						name: 'mongod',
						image: 'mongo:3.6',
						command: [
							'mongod',
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
		name: 'default'
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
		name: 'default'
	}
};

const clusterRoleBinding: V1ClusterRoleBinding = {
	metadata: {
		name: 'system:serviceaccount:db:default'
	},
	roleRef: {
		apiGroup: 'rbac.authorization.k8s.io',
		kind: 'ClusterRole',
		name: 'default'
	},
	subjects: [
		{
			kind: 'ServiceAccount',
			name: 'default',
			namespace: 'db'
		}
	]
};

const startupScript = `
#! /bin/bash
set -o errexit
set -o pipefail
set -o nounset

echo 'never' > /sys/kernel/mm/transparent_hugepage/enabled
echo 'never' > /sys/kernel/mm/transparent_hugepage/defrag
`;

const daemonSet: V1DaemonSet = {
	metadata: {
		name: 'startup-script'
	},
	spec: {
		selector: {
			matchLabels: {
				role: 'startup-script'
			}
		},
		template: {
			metadata: {
				labels: {
					role: 'startup-script'
				}
			},
			spec: {
				hostPID: true,
				containers: [
					{
						name: 'startup-script',
						image: 'gcr.io/google-containers/startup-script:v1',
						securityContext: {
							privileged: true
						},
						env: [
							{
								name: 'STARTUP_SCRIPT',
								value: startupScript
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
	statefulSet,
	clusterRole,
	serviceAccount,
	clusterRoleBinding,
	daemonSet
};