import React, { useEffect } from 'react';
import app from '../config/firebase';
import { connect } from 'react-redux';


const Home = (props) => {

  return (
    <>
      <h1>Home</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>{' '}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Home);
