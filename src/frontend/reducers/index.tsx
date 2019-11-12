import { routerReducer } from 'react-router-redux';
import userReducer from './userReducer';
import authReducer from './authReducer';
import noteReducer from './noteReducer';

const reducers = {
	'authReducer': authReducer,
	'userReducer': userReducer,
	'noteReducer': noteReducer,
	'router': routerReducer
};

export default reducers;