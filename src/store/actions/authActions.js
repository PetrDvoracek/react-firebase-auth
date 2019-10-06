import app from '../../config/firebase';
import {setLoading} from './appAction';


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
