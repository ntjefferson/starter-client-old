import React from "react";

// Redux
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../redux/rootActions";

// Router
import { Link } from "react-router-dom";

import { Icon as LegacyIcon } from "@ant-design/compatible";

// Design
import { Avatar, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

const useMenu = name => {
  const dispatch = useDispatch();
  return (
    <Menu className="account-menu">
      <Menu.ItemGroup title={name}>
        <Menu.Item key="account">
          <Link to="/a/account">
            <LegacyIcon type="user" />
            <span className="account-menu-item">Account</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="users">
          <Link to="/a/users">
            <LegacyIcon type="team" />
            <span className="account-menu-item">Users</span>
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" onClick={() => dispatch(logoutUser())}>
          <LegacyIcon type="logout" />
          Logout
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
};

const AccountMenu = props => {
  return (
    <Dropdown
      overlay={useMenu(props.name)}
      trigger={["click"]}
      placement="bottomLeft"
    >
      <span style={{ cursor: "pointer" }}>
        <Avatar className="avatar">{props.name[0]}</Avatar> <DownOutlined />
      </span>
    </Dropdown>
  );
};

export default AccountMenu;
