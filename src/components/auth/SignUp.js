import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../../config/firebase";
import { Typography, Form, Icon, Input, Button } from "antd";
import { AuthContext } from "./AuthContext";
import "./Login.css";

const { Title, Text } = Typography;

const SignUpBase = props => {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      const { email, passwordFirst, passwordSecond } = event.target.elements;
      if (passwordFirst.value !== passwordSecond.value) {
        alert("passwords are not same!");
        return;
      }
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, passwordFirst.value);
        props.history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [props.history]
  );

  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };
  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty({ confirmDirty: confirmDirty || !!value });
  };
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }
  const { getFieldDecorator } = props.form;

  return (
    <Form className="login-form" onSubmit={handleSubmit}>
      <Form.Item label="E-mail">
        {getFieldDecorator("email", {
          rules: [
            {
              type: "email",
              message: "The input is not valid E-mail!"
            },
            {
              required: true,
              message: "Please input your E-mail!"
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Password" hasFeedback>
        {getFieldDecorator("password", {
          rules: [
            {
              required: true,
              message: "Please input your password!"
            },
            {
              validator: validateToNextPassword
            }
          ]
        })(<Input.Password />)}
      </Form.Item>
      <Form.Item label="Confirm Password" hasFeedback>
        {getFieldDecorator("confirm", {
          rules: [
            {
              required: true,
              message: "Please confirm your password!"
            },
            {
              validator: compareToFirstPassword
            }
          ]
        })(<Input.Password onBlur={handleConfirmBlur} />)}
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

const SignUp = Form.create({ name: "register" })(SignUpBase);

export default withRouter(SignUp);
