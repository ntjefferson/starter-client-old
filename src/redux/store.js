import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./rootReducer";
import thunk from "redux-thunk"

import { verifyAuth } from './rootActions';

const middlewares = [thunk];

export function configureStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
    )
  );

  store.dispatch(verifyAuth())

  if (module.hot) {
    module.hot.accept("./rootReducer", () => {
      const nextRootReducer = require("./rootReducer");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
