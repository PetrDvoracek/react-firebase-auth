import app from '../../config/firebase';

export const login = (email, password) => {
  return (dispatch, getState) => {

    app.auth().signInWithEmailAndPassword(email, password);
    dispatch(  {
      type: 'LOGIN',
      email: email
    });
  };
};