import app from '../../config/firebase';

export const login = (credentials) => {
  return (dispatch, getState) => {
    const firebase = app;
    firebase
      .auth()
      .signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
      .then(() => {
        dispatch(  {
          type: 'LOGIN_SUCCESS',
        });
      })
      .catch((err) => {
        dispatch({
          type: 'LOGIN_ERROR',
          err
        });
      });

  };
};