const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
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
  default:
    console.log(`unknown case for authReducer: ${action.type}` );
    return state;


  }
  return state;
};

export default authReducer;