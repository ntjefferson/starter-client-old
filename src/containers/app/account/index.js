import React from "react";

// Design
import { Row } from "antd";

// Components
import InfoCard from "../../../components/InfoCard";
import Colx from "../../../components/Colx";

const AccountView = () => {
  return (
    <Row gutter={[24, 16]} type="flex">
      <Colx w={12}>
        <InfoCard title="Test Title" loading>
          Account View
        </InfoCard>
      </Colx>
      <Colx w={12}>
        <InfoCard title="Test Title" empty>
          Account View
        </InfoCard>
      </Colx>
    </Row>
  );
};

export default AccountView;
