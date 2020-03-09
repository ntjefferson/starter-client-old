import React from "react";

// Router
import { Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { loginUser } from "../../redux/rootActions";

import { Form, Icon as LegacyIcon } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";

// Design
import { Input, Button, Checkbox, Card, message } from "antd";
import "./user.css";

const loginErrorMessage = () => {
  message.error("There was an error logging in.");
};

class UserLogin extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email, password } = this.state;
        const { loginError } = this.props;
        this.props
          .loginUser(email, password)
          .then(e => (loginError ? loginErrorMessage() : console.log(e)));
      }
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return (
        <>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <div className="logo-dark" />

            <Card>
              <Form.Item>
                {getFieldDecorator("email", {
                  rules: [
                    { required: true, message: "Please input your email!" }
                  ]
                })(
                  <Input
                    prefix={
                      <LegacyIcon
                        type="user"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    placeholder="Email"
                    name="email"
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your password!" }
                  ]
                })(
                  <Input
                    prefix={
                      <LegacyIcon
                        type="lock"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("remember", {
                  valuePropName: "checked",
                  initialValue: true
                })(<Checkbox>Remember Me</Checkbox>)}
                <a className="login-form-forgot" href="/user/forgot-password">
                  Forgot password?
                </a>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={this.props.isLoggingIn}
                >
                  Login
                </Button>
              </Form.Item>
            </Card>
          </Form>
        </>
      );
    }
  }
}

const mapStateToProps = state => {
  const { isLoggingIn, loginError, isAuthenticated } = state.auth;
  return { isLoggingIn, loginError, isAuthenticated };
};

export default connect(mapStateToProps, { loginUser })(
  Form.create()(UserLogin)
);
