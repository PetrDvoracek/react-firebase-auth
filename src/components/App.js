import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';
import ForgotPassword from './auth/ForgotPassword';
import Landing from './Landing';
import * as routes from '../config/routes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Route exact path={ '/' + routes.landing } component={Landing} />
          <PrivateRoute exact path={ '/' + routes.app} component={Home} />
          <Route exact path={ '/' + routes.login } component={Login} />
          <Route exact path={ '/' + routes.register } component={SignUp} />
          <Route exact path={ '/' + routes.forgotPasswd }  component={ForgotPassword} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
