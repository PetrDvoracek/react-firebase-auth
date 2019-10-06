import app from '../../config/firebase';

export const login = (credentials) => {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    const firebase = app;
    firebase
      .auth()
      .signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
      .then(() => {
        dispatch(setLoading(false));
        dispatch(  {
          type: 'LOGIN_SUCCESS',
        });
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch({
          type: 'LOGIN_ERROR',
          err
        });
      });

  };
};

export const setLoading = (value) => {
  return (dispatch, getState) => {
    if(value === true) {
      dispatch({
        type: 'SET_LOADING_TRUE'
      });
    } else {
      dispatch({
        type: 'SET_LOADING_FALSE'
      });
    }
  };
};