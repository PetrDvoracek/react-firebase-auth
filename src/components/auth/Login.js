import React, { useCallback, useContext, useState } from 'react';
import './Login.css';
import { withRouter, Redirect } from 'react-router';
import app from '../../config/firebase';
import { AuthContext } from './AuthContext';
import { Typography, Form, Icon, Input, Button, Checkbox } from 'antd';
import firebase from 'firebase/app';
import 'firebase/auth';
import { appName } from '../../config/globalNames';
import * as routes from '../../config/routes';
import { connect } from 'react-redux';
import { login } from '../../store/actions/authActions';

const { Title, Text } = Typography;


const Login = (props) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password, rememberUser } = event.target.elements;
      const firebasePersistence = (rememberUser.checked) ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION;

      app.auth().setPersistence(firebasePersistence)
        .then(function () {
          setLoading(true);
          //return app.auth().signInWithEmailAndPassword(email.value, password.value);

          return props.login({email: email.value, password: password.value});
        })
        .then(function () {
          props.history.push(`/${routes.app}`);
        })
        .catch(function (error) {
          setMessage(error.message);
          setLoading(false);

        });
      
    },
    [props.history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to={`/${routes.app}`} />;
  }

  const { authError } = props;
  return (
    <Form onSubmit={handleLogin} className="login-form">
      <div className="login-form-title">
        <Title>{ appName }</Title>
        <Text disabled>There is always better solution.</Text>
      </div>
      <Form.Item>
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Username"
          name="email"
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="Password"
          name="password"
        />
      </Form.Item>
      <Form.Item>
        <Checkbox name="rememberUser">Remember me</Checkbox>
        <a className="login-form-forgot" href={ '/' + routes.forgotPasswd}>
          Forgot password
        </a>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
            Log in
        </Button>
        Or <a href={ '/' + routes.register }>register now!</a>
      </Form.Item>
      <Form.Item>
        <div className="login-form-message">

          { authError ? <Text type="danger">{authError}</Text>: null }

        </div>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (creds) => dispatch(login(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
