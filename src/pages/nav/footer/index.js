import React from "react";

// Design
import { Layout, Row } from "antd";
import Colx from "../../../components/Colx";

// Design (const)
const { Footer } = Layout;

const MainFooter = () => {
  return (
    <Footer style={{ borderTop: "1px solid lightgray" }}>
      <Row>
        <Colx w={8}></Colx>
        <Colx w={8}>
          <div
            className="logo-mobile"
            style={{ filter: "grayscale(1)", height: "2em" }}
          />
        </Colx>
        <Colx w={8}></Colx>
      </Row>
    </Footer>
  );
};

export default MainFooter;
