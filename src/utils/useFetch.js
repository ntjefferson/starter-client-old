import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

export const useFetch = (url, reducer, method = "GET", param) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    data: [],
    loading: true,
    error: false,
    empty: false
  });

  let body;
  if (method !== "GET") {
    body = JSON.stringify(param);
  }

  // Uncomment this for JWT authentication
  // let authToken = useSelector(state => state.info.userInfo.token) || "N/A";


  // Delete this when uncommenting the above
  let authToken = "N/A"

  const effectFetch = useCallback(() => {
    fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": authToken
      },
      body
    })
      .then(res => res.json())
      .then(res =>
        setValues({
          data: res,
          loading: false,
          error: false,
          empty:
            !res || res.length === 0 || Object.keys(res).length === 0
              ? true
              : false
        })
      )
      .catch(err =>
        setValues({ data: [], loading: false, error: true, empty: false })
      );
  }, [url, method, body, authToken]);

  useEffect(() => {
    effectFetch();
  }, [effectFetch]);

  if (reducer && !values.loading) {
    dispatch({ type: reducer, payload: values.data });
  }

  return values;
};
