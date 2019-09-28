import React, { useCallback, useContext, useState } from 'react';
import { withRouter, Redirect } from 'react-router';
import app from '../../config/firebase';
import { AuthContext } from './AuthContext';
import { Typography, Form, Icon, Input, Button } from 'antd';
import './Login.css';

const { Title, Text } = Typography;

const ForgotPasswordBase = props => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      const { email } = event.target.elements;
      try {
        setLoading(true);
        await app.auth().sendPasswordResetEmail(email.value);
        props.history.push('/');
      } catch (error) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    },
    [props.history]
  );
  const { getFieldDecorator } = props.form;
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/home" />;
  }

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <div className="login-form-title">
        <Title>EquipPex</Title>
        <Text disabled>There is always better solution.</Text>
      </div>
      <Form.Item>
        {getFieldDecorator('email', {
          rules: [
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: 'Please input your E-mail!'
            }
          ]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="E-mail"
            name="email"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
            Reset Password
        </Button>
        Or <a href="/login">Sign In</a>
      </Form.Item>
      <Form.Item>
        <div className="login-form-message">
          <Text type="danger">{message}</Text>
        </div>
      </Form.Item>
    </Form>
  );
};

const ForgotPassword = Form.create({ name: 'register' })(ForgotPasswordBase);

export default withRouter(ForgotPassword);
