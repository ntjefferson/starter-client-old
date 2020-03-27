import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Icon as LegacyIcon } from "@ant-design/compatible";

// Design
import { Drawer, Divider, Row, Empty, Badge } from "antd";

// Utils
import { useFetch } from "../../../../utils/useFetch";
import { useWindowDimensions } from "../../../../utils/useWindow";

// Other
import moment from "moment";

const NotificationIcon = type => {
  let icon = [];
  if (type.type === "DOWN") {
    icon = ["exclamation-circle", "#FF4D4F"];
  } else if (type.type === "INFO") {
    icon = ["info-circle", "#1890FF"];
  } else if (type.type === "FEATURE" || "RESOLVED") {
    icon = ["check-circle", "#52C41A"];
  } else {
    icon = ["question-circle", ""];
  }

  return (
    <LegacyIcon style={{ color: icon[1], fontSize: "32px" }} type={icon[0]} />
  );
};

// Notification Item
const NotificationItem = data => {
  return (
    <div
      style={{
        fontSize: 14,
        marginBottom: 7,
        minHeight: "150px"
      }}
    >
      <NotificationIcon type={data.type} />

      <h3
        style={{
          display: "inline-block",
          float: "right",
          lineHeight: "32px"
        }}
      >
        {data.type}
      </h3>
      <br />
      <br />
      <b>Description: </b>
      {data.text}
      <i style={{ bottom: 0, position: "absolute", right: 0 }}>
        {moment(data.created_at).format("YYYY-MM-DD HH:mm")}
      </i>
    </div>
  );
};

const Notifications = props => {
  const [drawer, setDrawer] = useState(false);
  const size = useSelector(state => state.screenSize.size);
  const { width } = useWindowDimensions();

  const showNotificationPane = () => {
    setDrawer(!drawer);
  };

  const { data } = useFetch(
    `http://localhost:5000/platform/v1/getNotifications`
  )

  return (
    <div>
      <span style={{marginRight: "16px"}}>
      <Badge dot={data.length > 0 ? true : false}>
        <LegacyIcon
          type="bell"
          className="trigger-third"
          onClick={showNotificationPane}
        />
      </Badge>
      </span>
      <Drawer
        title="Recent Notifications"
        placement="right"
        visible={drawer}
        onClose={showNotificationPane}
        width={size > 1 ? 480 : width}
        bodyStyle={{ height: "100%" }}
      >
        {data.length > 0 ? (
          data.map(item => {
            return (
              <>
                <Row>{NotificationItem(item)}</Row>
                <Divider />{" "}
              </>
            );
          })
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            className="middle-div"
            description="No Notifications"
          />
        )}
      </Drawer>
    </div>
  );
};

export default Notifications;
