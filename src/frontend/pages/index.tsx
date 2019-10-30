import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk-recursion-detect';

import App from '../components/App';
import reducers from '../reducers';
import { ICurrent } from '../types';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';
import * as config from '../../config.json';

const reducer = combineReducers(reducers);

const store = (config.reducer) ? createStore(
	reducer,
	undefined,
	compose(applyMiddleware(thunkMiddleware))
) : createStore(
	reducers.currentReducer,
	undefined,
	compose(applyMiddleware(thunkMiddleware)),
);


render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
