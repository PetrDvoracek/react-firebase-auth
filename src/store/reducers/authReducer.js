const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  console.log(action.type);
  switch (action.type) {
  case 'SET_LOADING':
    return {
      ...state,
      authError: null,
      loading: action.value
    };
  case 'LOADING_FALSE':
    return {
      ...state,
      authError: null,
      loading: false
    }
  case 'LOGIN_SUCCESS':
    return {
      ...state,
      authError: null,
      loading: false
    };
  case 'LOGIN_ERROR':
    return {
      ...state,
      authError: `${action.err.message}`,
      loading: false
    };
  case 'USER_CREATED':
    return {
      ...state,
      authError: null,
      loading: false
    };
  case 'USER_CREATE_ERROR':
    return {
      ...state,
      authError: null,
      loading: false
    };
  case 'SET_ERROR':
    return {
      ...state,
      authError: action.err
    };
  case 'FORGOT_PASSWD_EMAIL_SEND':
    return {
      ...state,
      authError: null,
      authInfo: `Check your email ${action.email}`,
      loading: false,
    };
  case 'ERROR_FORGOT_PASSWD_EMAIL_SEND':
    return {
      ...state,
      authError: action.err,
      loading: false
    };
  default:
    return state;
  }
};

export default authReducer;