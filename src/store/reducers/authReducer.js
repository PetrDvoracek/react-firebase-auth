const initState = {
  authError: null,
  loading: false
};

const authReducer = (state = initState, action) => {
  console.log(action.type);
  switch (action.type) {
  case 'LOGIN_SUCCESS':
    console.log('login success');
    return {
      ...state,
      authError: null,
    };
  case 'LOGIN_ERROR':
    console.log('login ERROR');
    return {
      ...state,
      authError: 'Login Failed'
    };
  case 'SET_LOADING_TRUE':
    return {
      ...state,
      loading: true,
    };
  case 'SET_LOADING_FALSE':
    return {
      ...state,
      loading: false
    };
  default:
    console.log(`unknown case for authReducer: ${action.type}` );
    return state;


  }
  return state;
};

export default authReducer;