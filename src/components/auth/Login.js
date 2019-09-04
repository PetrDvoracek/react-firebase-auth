import React, { useCallback, useContext } from "react";
import "./Login.css";
import { withRouter, Redirect } from "react-router";
import app from "../../config/firebase";
import { AuthContext } from "./AuthContext";
import { Typography, Form, Icon, Input, Button, Checkbox } from "antd";
const { Title, Text } = Typography;

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
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
    <Form onSubmit={handleLogin} className="login-form">
      <div className="login-form-title">
        <Title>EquipPex</Title>
        <Text disabled>There is always better solution.</Text>
      </div>
      <Form.Item>
        <Input
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Username"
          name="email"
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="Password"
          name="password"
        />
      </Form.Item>
      <Form.Item>
        <Checkbox>Remember me</Checkbox>
        <a className="login-form-forgot" href="/forgot-password">
          Forgot password
        </a>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="/sign-up">register now!</a>
      </Form.Item>
    </Form>
  );
};

export default withRouter(Login);
