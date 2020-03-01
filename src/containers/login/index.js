import React, { Suspense } from "react";

// Router
import { Route, Switch, Redirect } from "react-router-dom";

// Pages
const UserLogin = React.lazy(() => import("./UserLogin"));
const ForgotPassword = React.lazy(() => import("./ForgotPassword"));

const LoginView = ({ match }) => {
  return (
    <div className="user-background">
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
          <Route path={`${match.url}/login`} render={props => <UserLogin />} />
          <Route
            path={`${match.url}/forgot-password`}
            render={props => <ForgotPassword />}
          />
          <Redirect to="/error" />
        </Switch>
      </Suspense>
    </div>
  );
};

export default LoginView;
