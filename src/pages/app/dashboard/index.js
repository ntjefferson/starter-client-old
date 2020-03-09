import React from "react";

// Design
import { Row } from "antd";

// Components
import InfoCard from "../../../components/InfoCard";
import Colx from "../../../components/Colx";

const DashboardPage = props => {
  return (
    <>
      <Row gutter={[24, 16]} type="flex">
        <Colx w={8}>
          <InfoCard
            title="Loading Test"
            loading
            info
            tooltip="This is a loading block, after 20 seconds the message changes."
          >
            Account View
          </InfoCard>
        </Colx>
        <Colx w={8}>
          <InfoCard
            title="Empty Test"
            empty
            info
            tooltip="This displays if you return no data."
          >
            Account View
          </InfoCard>
        </Colx>
        <Colx w={8}>
          <InfoCard
            title="Error Test"
            error
            info
            tooltip="This displays if the fetch hook returns an error."
          >
            Account View
          </InfoCard>
        </Colx>
      </Row>
    </>
  );
};

export default DashboardPage;
