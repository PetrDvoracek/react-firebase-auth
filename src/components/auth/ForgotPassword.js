import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../../config/firebase";
import { AuthContext } from "./Auth.js";

const ForgotPassword = ({ history }) => {
  const handlePasswordChange = useCallback(
    async event => {
      event.preventDefault();
      const { email } = event.target.elements;
      try {
        await app.auth().sendPasswordResetEmail(email.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handlePasswordChange}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default withRouter(ForgotPassword);
