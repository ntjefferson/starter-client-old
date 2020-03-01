import React from "react";

// Router
import { Redirect } from "react-router-dom";

// Design
import { message } from "antd";

// Message for invalid URL
const invalidUrl = () => {
  message.error("Invalid URL. Redirected to dashboard.");
};

const ErrorView = props => {
  return (
    <div>
      {invalidUrl()}
      <Redirect to="/a/dashboard" />
    </div>
  );
};

export default ErrorView;
