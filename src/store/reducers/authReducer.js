const initState = {
  data: 'data from auth reducer'
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
  case 'LOGIN':
    console.log('logged');

  }
  return state;
};

export default authReducer;