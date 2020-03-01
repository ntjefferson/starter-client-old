import React, { useEffect, useState } from "react";

// Design
import { Typography } from "antd";
import "./page-loader.css";

// Design (const)
const { Text } = Typography;

const Loader = () => {
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(true);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setMessage(
          "This item has been loading over 20 seconds. Try refreshing the page."
        ),
      20000
    );

    return () => clearInterval(interval);
  }, []);

  setTimeout(() => setTimer(false), 500);

  if (timer) {
    return null;
  } else {
    return (
      <div className="middle-div">
        <div className="sk-folding-cube middle-div">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
        <br />
        <h4 className="middle-div" style={{ textAlign: "center" }}>
          <Text type="secondary">{message || "Loading..."}</Text>
        </h4>
      </div>
    );
  }
};

export default Loader;
