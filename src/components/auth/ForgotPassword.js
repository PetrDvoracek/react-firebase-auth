import React, { useCallback, useContext, useState } from 'react';
import { withRouter, Redirect } from 'react-router';
import app from '../../config/firebase';
import { AuthContext } from './AuthContext';
import {Typography, Form, Icon, Input, Button } from 'antd';
import './Login.css';
import { appName } from '../../config/globalNames';
import { setLoading, setError, forgotPassword } from '../../store/actions/authActions';
import { connect } from 'react-redux';


const { Title, Text } = Typography;

const ForgotPasswordBase = props => {
  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      const { email } = event.target.elements;
      props.forgotPassword(email).then(() => {
        //props.history.push('/');
      })
        .catch((err) => {
          props.setError(err.message);
          props.setLoading(false);
        });
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
        <Title>{ appName }</Title>
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
          loading={props.loading}
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

          { props.authError ? <Text type="danger">{props.authError}</Text>: null }
          { props.authInfo ? <Text typ="info">{props.authInfo}</Text>: null }

        </div>
      </Form.Item>
    </Form>
  );
};
const mapStateToProps = (state) => {
  return {
    error: state.auth.authError,
    loading: state.auth.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (value) => dispatch(setLoading(value)),
    setError: (message) => dispatch(setError(message)),
    forgotPassword: (email) => dispatch(forgotPassword((email)))
  };
};

const ForgotPassword = Form.create({ name: 'register' })(ForgotPasswordBase);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ForgotPassword));

