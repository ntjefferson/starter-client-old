import React, { useState, useEffect, Suspense } from "react";

// Redux
import { useDispatch } from "react-redux";

// Router
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

// Design
import { Layout } from "antd";

// Layout
import Sidebar from "../nav/sidebar";
import NavHeader from "../nav/header";
import MainFooter from "../nav/footer";

// Other
import firebase from "firebase";

// Components
import Loader from "../../components/Loader";

// Design (const)
const { Content } = Layout;

// Views
const ErrorPage = React.lazy(() => import("./error"));
const DashboardPage = React.lazy(() => import("./dashboard"));

// Verifies firebase token and retrieves initial account info
// Since there are two async requests, not using custom hook
const checkToken = async () => {
  const token = await firebase.auth().currentUser?.getIdToken(true);
  const auth = await fetch("http://localhost:5000/platform/v1/info", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token
    })
  })
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
  return auth;
};

// Component
const AppView = props => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const effectFunction = async () => {
      const res = await checkToken();
      dispatch({ type: "GET_INFO", info: res });
      res ? setLoading(false) : setError(true);
    };

    effectFunction();
  }, [dispatch]);

  // Loading account information
  if (loading) {
    return <Loader />;
  }

  // Error
  if (error) {
    return <div> There was an error... </div>;
  }

  // Success
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <NavHeader />
        <Suspense fallback={<Loader />}>
          <Content style={{ padding: "24px" }}>
            <Switch>
              <Redirect exact from={`/a`} to={`/a/dashboard`} />
              <Route
                path="/a/dashboard"
                render={props => (
                  <DashboardPage {...props} />
                )}
              />
              <Route path="/a" render={props => <ErrorPage {...props} />} />
              <Redirect from="/a" to="/a/dashboard" />
            </Switch>
          </Content>
          <MainFooter />
        </Suspense>
      </Layout>
    </Layout>
  );
};

export default withRouter(AppView);
