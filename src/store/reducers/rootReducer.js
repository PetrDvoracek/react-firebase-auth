import authReducer from './authReducer';
import { combineReducers } from 'redux';


//add custom fields in object
const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;