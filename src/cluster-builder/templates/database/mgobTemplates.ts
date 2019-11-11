import { V1ConfigMap, V1Service, V1StatefulSet } from "@kubernetes/client-node";

const backupYml = `
target:
  host: "mongo-0.mongo.db,mongo-1.mongo.db,mongo-2.mongo.db"
  port: 27017
  database: "test"
scheduler:
  cron: "*/1 * * * *"
  retention: 1
  timeout: 60
gcloud:
  bucket: "cluster-builder-test-mgob"
  keyFilePath: /etc/mgob/service-account.json
`;

const configMap: V1ConfigMap = {
	metadata: {
		name: 'mgob-gstore-config',
		labels: {
			role: 'mongo-backup'
		}
	},
	data: {
		'backup.yml': backupYml
	}
};

const service: V1Service = {
	metadata: {
		name: 'mgob',
		labels: {
			name: 'mgob'
		}
	},
	spec: {
		ports: [
			{
				port: 8090
			}
		],
		clusterIP: 'None',
		selector: {
			role: 'mongo-backup'
		}
	}
};

const statefulSet: V1StatefulSet = {
	metadata: {
		name: 'mgob'
	},
	spec: {
		serviceName: 'mgob',
		replicas: 1,
		selector: {
			matchLabels: {
				role: 'mongo-backup'
			}
		},
		template: {
			metadata: {
				labels: {
					role: 'mongo-backup'
				}
			},
			spec: {
				nodeSelector: {
					'cloud.google.com/gke-nodepool': "mongo"
				},
				containers: [
					{
						name: 'mgobd',
						image: 'stefanprodan/mgob:edge',
						imagePullPolicy: 'Always',
						ports: [
							{
								containerPort: 8090,
								protocol: 'TCP'
							}
						],
						volumeMounts: [
							{
								name: 'mgob-storage',
								mountPath: '/storage'
							},
							{
								name: 'mgob-data',
								mountPath: '/data'
							},
							{
								name: 'mgob-data',
								mountPath: '/tmp'
							},
							{
								name: 'mgob-gstore-config',
								mountPath: '/config/backup.yml',
								subPath: 'backup.yml'
							},
							{
								name: 'gcp-key',
								mountPath: '/etc/mgob',
								readOnly: true
							}
						]
					}
				],
				volumes: [
					{
						name: 'mgob-gstore-config',
						configMap: {
							name: 'mgob-gstore-config',
							items: [
								{
									key: 'backup.yml',
									path: 'backup.yml'
								}
							]
						}
					},
					{
						name: 'gcp-key',
						secret: {
							secretName: 'gcp-key'
						}
					}
				]
			}
		},
		volumeClaimTemplates: [
			{
				metadata: {
					name: 'mgob-storage',
					annotations: {
						'volume.beta.kubernetes.io/storage-class': 'hdd'
					}
				},
				spec: {
					accessModes: [
						'ReadWriteOnce'
					],
					resources: {
						requests: {
							storage: '3Gi'
						}
					}
				}
			},
			{
				metadata: {
					name: 'mgob-data',
					annotations: {
						'volume.beta.kubernetes.io/storage-class': 'hdd'
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

export {
	configMap,
	service,
	statefulSet
};