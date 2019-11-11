import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk-recursion-detect';

import App from '../components/App';
import reducers from '../reducers';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';

const reducer = combineReducers(reducers);

const store = createStore(
	reducer,
	undefined,
	compose(applyMiddleware(thunkMiddleware))
);


render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
