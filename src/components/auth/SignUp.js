import React, { useCallback, useContext, useState } from 'react';
import { withRouter, Redirect } from 'react-router';
import app from '../../config/firebase';
import { Typography, Form, Icon, Input, Button } from 'antd';
import { AuthContext } from './AuthContext';
import './Login.css';
import { appName } from '../../config/globalNames';
import * as routes from '../../config/routes';


const { Title, Text } = Typography;

const SignUpBase = props => {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      const { email, passwordFirst, passwordSecond } = event.target.elements;
      if (passwordFirst.value === passwordSecond.value) {
        try {
          setLoading(true);
          await app
            .auth()
            .createUserWithEmailAndPassword(email.value, passwordFirst.value);
          props.history.push('/login');
        } catch (error) {
          setMessage(error.message);
          setLoading(false);

        }
        // app.auth().createUserWithEmailAndPassword(email.value, passwordFirst.value)
        //   .then(function sucess(userData) {
        //     try {
        //       createNewUser(userData.uid, userData.email, userData.email, 'imagePath');
        //       props.history.push('/');
        //     } catch (error) {
        //       setMessage(error.message);
        //     }
        //     setLoading(false);
        //   }, function (error) {
        //     setMessage(error.message);
        //     setLoading(false);
        //   })
        //   .catch(function (error) {
        //     setMessage(error.message);
        //     setLoading(false);
        //   });
      } else {
        setMessage('Please confirm your password!');
      }
    },
    [props.history]
  );

  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Passwords are not same!');
    } else {
      callback();
    }
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty({ confirmDirty: confirmDirty || !!value });
  };
  const { currentUser } = useContext(AuthContext);
  if (currentUser && !loading) {
    return <Redirect to="/home" />;
  }
  const { getFieldDecorator } = props.form;

  return (
    <Form className="login-form" onSubmit={handleSubmit}>
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
      <Form.Item hasFeedback>
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: 'Please input your password!'
            },
            {
              validator: validateToNextPassword
            }
          ]
        })(
          <Input.Password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Password"
            name="passwordFirst"
          />
        )}
      </Form.Item>
      <Form.Item hasFeedback>
        {getFieldDecorator('confirm', {
          rules: [
            {
              required: true,
              message: 'Please confirm your password!'
            },
            {
              validator: compareToFirstPassword
            }
          ]
        })(
          <Input.Password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Confirm Password"
            onBlur={handleConfirmBlur}
            name="passwordSecond"
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
            Register
        </Button>
        Do you already have an account? <a href={'/' + routes.login}>Sign In!</a>
      </Form.Item>
      <Form.Item>
        <div className="login-form-message">
          <Text type="danger">{message}</Text>
        </div>
      </Form.Item>
    </Form>
  );
};

const SignUp = Form.create({ name: 'register' })(SignUpBase);

export default withRouter(SignUp);
