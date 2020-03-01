import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

export const useFetch = (url, token = false, method = "GET", param) => {
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

  let authToken = useSelector(state => state.info.info);

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

  return values;
};
