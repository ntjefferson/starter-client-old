import React from "react";

// Redux
import { useSelector } from "react-redux";

// Router
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// Utils
import "./utils/Firebase";

// Design
import "./App.css";

// Views
import AppView from "./containers/app";
import LoginView from "./containers/login";

// Components
import Loader from "./components/Loader/"

const AuthRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/user/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const App = () => {
  const isVerifying = useSelector(state => state.auth.isVerifying);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return !isVerifying ? (
    <div>
      <Router>
        <Switch>
          <AuthRoute
            path="/a"
            isAuthenticated={isAuthenticated}
            component={AppView}
          />
          {isAuthenticated && (
            <Redirect to="/a" render={props => <AppView {...props} />} />
          )}
          <Route path="/user" render={props => <LoginView {...props} />} />
          <Route
            path="/"
            exact
            render={props => <Redirect to="/a" {...props} />}
          />
          <Redirect to="/user/login" />
        </Switch>
      </Router>
    </div>
  ) : (
    <Loader />
  );
};

export default App;
