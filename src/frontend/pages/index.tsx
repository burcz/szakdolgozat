import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk-recursion-detect';

import App from '../components/App';
import currentReducer from '../reducers/current';
import { ICurrent } from '../types';

import 'bootstrap/dist/css/bootstrap.min.css';


const store = createStore<ICurrent, any, any, any>(
	currentReducer,
	undefined,
	compose(applyMiddleware(thunkMiddleware)),
);

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
