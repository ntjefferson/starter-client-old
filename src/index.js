import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as Sentry from "@sentry/browser";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    environment: process.env.NODE_ENV,
    dsn: "https://5e2ea2f5ee9d4ac5929bbf34d9615b2d@sentry.io/3131152"
  });
}

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
