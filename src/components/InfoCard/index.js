import React from "react";

// Prop validation
import PropTypes from "prop-types";

import { Icon as LegacyIcon } from '@ant-design/compatible';

// Design
import { Tooltip, Card, Result } from "antd";

// Components
import Loader from "../Loader";

const InfoCard = props => {
  // Info Icon
  let infoIcon;
  if (props.info) {
    infoIcon = (
      <Tooltip title={props.tooltip} placement="left">
        <LegacyIcon type="question-circle" />
      </Tooltip>
    );
  } else {
    infoIcon = "";
  }

  // Button or Action
  let button;
  if (props.button) {
    button = props.button;
  } else {
    button = "";
  }

  // Combine Info and Button
  let extra;
  extra = (
    <div>
      {button} {infoIcon}
    </div>
  );

  // Generate body
  let body;
  if (props.error) {
    body = (
      <Result
        className="middle-div"
        icon={<LegacyIcon type="exclamation-circle" style={{ color: "#DCE0E6" }} />}
        status="info"
        subTitle="There was an error loading the item. Please try refreshing the page or contacting support."
      />
    );
  } else if (props.empty) {
    body = (
      <Result
        className="middle-div"
        icon={<LegacyIcon type="line-chart" style={{ color: "#DCE0E6" }} />}
        status="info"
        subTitle="No Data Found"
      />
    );
  } else if (props.loading) {
    body = <Loader />;
  } else {
    body = props.children;
  }

  // Component
  return (
    <Card
      title={props.title}
      extra={extra}
      style={{ height: "100%" }}
      bodyStyle={{ height: "calc(100% - 56px)" }}
    >
      {body}
    </Card>
  );
};

// Validating props
InfoCard.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  info: PropTypes.bool,
  title: PropTypes.string,
  empty: PropTypes.bool,
  tooltip: PropTypes.string
};

InfoCard.defaultProps = {
  loading: false,
  error: false,
  info: false,
  empty: false,
  title: ""
};

export default InfoCard;
