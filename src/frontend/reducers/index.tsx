import { routerReducer } from 'react-router-redux';
import userReducer from './userReducer';
import currentReducer from './current';

const reducers = {
	'currentReducer': currentReducer,
	'userReducer': userReducer,
	'router': routerReducer
};

export default reducers;