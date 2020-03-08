import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
};

export const useWindowDimensions = () => {
  const dispatch = useDispatch();
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let size = 3;
  if (windowDimensions.width >= 992) {
    size = 3;
  } else if (windowDimensions.width < 992 && windowDimensions.width > 577) {
    size = 2;
  } else {
    size = 1;
  }

  useEffect(() => {
    dispatch({ type: "SET_SIZE", payload: size});
  }, [size, dispatch])

  return windowDimensions;
};
