import React from "react";

// React Redux
import { connect } from "react-redux";

// Router
import { Redirect } from "react-router-dom";

// Util
import { myFirebase } from "../../constant/firebase";

import { Form, Icon as LegacyIcon } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";

// Design
import { Input, Button, Checkbox, Card, message } from "antd";
import "./user.css";

const successMessage = () => {
  message.success("Password reset sent.");
};

const errorMessage = () => {
  message.error("There was an error resetting your password.");
};

class ForgotPassword extends React.Component {
  state = {
    email: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email } = this.state;
        myFirebase
          .auth()
          .sendPasswordResetEmail(email)
          .then(e => successMessage())
          .catch(error => errorMessage());
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
                {getFieldDecorator("remember", {
                  valuePropName: "checked",
                  initialValue: true
                })(<Checkbox>Remember Me</Checkbox>)}
                <a className="login-form-forgot" href="/user/login">
                  Need to login?
                </a>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={this.props.isLoggingIn}
                >
                  Reset Password
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
  const { isAuthenticated } = state.auth;
  return { isAuthenticated };
};

export default connect(mapStateToProps, {})(Form.create()(ForgotPassword));
