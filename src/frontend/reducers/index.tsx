import { routerReducer } from 'react-router-redux';
import userReducer from './userReducer';
import currentReducer from './current';
import noteReducer from './noteReducer';

const reducers = {
	'currentReducer': currentReducer,
	'userReducer': userReducer,
	'noteReducer': noteReducer,
	'router': routerReducer
};

export default reducers;