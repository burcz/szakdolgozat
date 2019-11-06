import { api, database, cluster, frontend } from './components';

async function main() {
	try {
		const k8sClient = await cluster.setup();

		await database.setup(k8sClient);
		await api.setup(k8sClient);
		await frontend.setup(k8sClient);

	}
	catch (err) {
		console.log(JSON.stringify(err, null, 2));
	}
}

main();
