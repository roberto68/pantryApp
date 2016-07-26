import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { firebaseReducer } from './firebase';
import { tasksReducer } from './tasks';


export default combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  routing: routerReducer,
  tasks: tasksReducer
});
