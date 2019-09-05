import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../../config/firebase";
import { Typography, Form, Icon, Input, Button } from "antd";
import { AuthContext } from "./AuthContext";
import "./Login.css";

const { Title, Text } = Typography;

const SignUpBase = props => {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      const { email, passwordFirst, PasswordSecond } = event.target.elements;
      if (passwordFirst.value === PasswordSecond.value) {
        try {
          setLoading(true);
          await app
            .auth()
            .createUserWithEmailAndPassword(email.value, passwordFirst.value);
          props.history.push("/");
        } catch (error) {
          alert(error);
        } finally {
          setLoading(false);
        }
      } else {
        alert("Please confirm your password!");
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
      <div className="login-form-title">
        <Title>EquipPex</Title>
        <Text disabled>There is always better solution.</Text>
      </div>
      <Form.Item>
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
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="E-mail"
            name="email"
          />
        )}
      </Form.Item>
      <Form.Item hasFeedback>
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
        })(
          <Input.Password
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Password"
            name="passwordFirst"
          />
        )}
      </Form.Item>
      <Form.Item hasFeedback>
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
        })(
          <Input.Password
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Confirm Password"
            onBlur={handleConfirmBlur}
          />
        )}
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Register
        </Button>
        Do you already have an account? <a href="/login">log in!</a>
      </Form.Item>
    </Form>
  );
};

const SignUp = Form.create({ name: "register" })(SignUpBase);

export default withRouter(SignUp);
