import React, { useCallback, useContext, useState } from 'react';
import './Login.css';
import { withRouter, Redirect } from 'react-router';
import app from '../../config/firebase';
import { AuthContext } from './AuthContext';
import { Typography, Form, Icon, Input, Button, Checkbox } from 'antd';
import firebase from 'firebase/app';
import 'firebase/auth';
const { Title, Text } = Typography;

const Login = ({ history }) => {
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
          return app.auth().signInWithEmailAndPassword(email.value, password.value);
        })
        .then(function () {
          history.push('/home');
        })
        .catch(function (error) {
          setMessage(error.message);
          setLoading(false);

        });
      
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/home" />;
  }

  return (
    <Form onSubmit={handleLogin} className="login-form">
      <div className="login-form-title">
        <Title>EquipPex</Title>
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
        <a className="login-form-forgot" href="/forgot-password">
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
        Or <a href="/sign-up">register now!</a>
      </Form.Item>
      <Form.Item>
        <div className="login-form-message">
          <Text type="danger">{message}</Text>
        </div>
      </Form.Item>
    </Form>
  );
};

export default withRouter(Login);
