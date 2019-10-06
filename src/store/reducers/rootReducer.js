import authReducer from './authReducer';
import { combineReducers } from 'redux';
import {firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

//add custom fields in object
const rootReducer = combineReducers({
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;