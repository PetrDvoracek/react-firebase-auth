import app from '../../config/firebase';


const firebase = app;

export const login = (credentials) => {
  return (dispatch) => {
    dispatch({
      type: 'LOADING_TRUE'
    });
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

export const createUser = (credentials) => {
  return (dispatch) => {
    dispatch({
      type: 'LOADING_TRUE'
    });
    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({
          type: 'USER_CREATED'
        });
      })
      .catch((err) => {
        dispatch({
          type: 'USER_CREATE_ERROR',
          err
        });
      });
  };
};

export const forgotPassword = (email) => {
  return (dispatch) => {
    dispatch({
      type: 'LOADING_TRUE'
    });
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        dispatch({
          type: 'FORGOT_PASSWD_EMAIL_SEND',
          email
        });
      })
      .catch((err) => {
        dispatch({
          type: 'ERROR_FORGOT_PASSWD_EMAIL_SEND',
          err,
          email
        });
      });
  };
};

export const setLoading = (value) => {
  return {
    type: 'SET_LOADING',
    value
  };
};

export const setError = (err) => {
  return {
    type: 'SET_ERROR',
    err
  };
};