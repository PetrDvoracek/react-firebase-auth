export const createProject = (project) => {
  return (dispatch, getState) => {
    // make async call
    dispatch(  {
      type: 'ADD_PROJECT',
      project: project
    });
  };


};