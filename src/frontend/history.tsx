import { createMemoryHistory } from 'history';

declare global {
	interface Window {
		dataLayer: any;
	}
}

const history = createMemoryHistory();

export default history;