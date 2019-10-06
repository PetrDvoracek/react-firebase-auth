import authReducer from './authReducer';
import appReducer from './appReducer';
import { combineReducers } from 'redux';
import {firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

//add custom fields in object
const rootReducer = combineReducers({
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  app: appReducer
});

export default rootReducer;