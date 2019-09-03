import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";
import ForgotPassword from "./auth/ForgotPassword";
import ErrorHandler from "./ErrorHandler";

function App() {
  return (
    <AuthProvider>
      <ErrorHandler>
        <Router>
          <div>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
          </div>
        </Router>
      </ErrorHandler>
    </AuthProvider>
  );
}

export default App;
