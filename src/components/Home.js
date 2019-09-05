import React from 'react';
import app from '../config/firebase';
import {db} from '../config/firebase';

const Home = () => {
  const dbTest = () =>{
    db.collection('users').add({
      first: 'Ada',
      last: 'Lovelace',
      born: 1815
    })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };


  return (
    <>
      <h1>Home</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>{' '}
      <button onClick={()=>dbTest()}>test db</button>
    </>
  );
};

export default Home;
