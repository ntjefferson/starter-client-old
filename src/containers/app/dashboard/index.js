import React from "react";

// Design
import { Row } from "antd";

// Components
import InfoCard from "../../../components/InfoCard";
import Colx from "../../../components/Colx";

const DashboardView = props => {

  return (
    <Row gutter={[24, 16]} type="flex">
      <Colx w={8}>
        <InfoCard title="Test Title" loading>
          Account View
        </InfoCard>
      </Colx>
      <Colx w={8}>
        <InfoCard title="Test Title" empty>
          Account View
        </InfoCard>
      </Colx>
      <Colx w={8}>
        <InfoCard title="Test Title" error>
          Account View
        </InfoCard>
      </Colx>
    </Row>
  );
};

export default DashboardView;
