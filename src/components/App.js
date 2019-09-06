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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Route exact path="/" component={Landing} />
          <PrivateRoute exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
