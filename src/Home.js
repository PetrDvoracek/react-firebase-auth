import React from "react";
import app from "./base";

const signOut = () => {
  app.auth().signOut();
  console.log("Signed Out");
};

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>{" "}
    </>
  );
};

export default Home;
