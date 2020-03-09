import React from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";

import { Icon as LegacyIcon } from '@ant-design/compatible';

// Design
import { Layout } from "antd";
import "./header.css";

// Views
import AccountMenu from "./views/AccountMenu";
import Notifications from "./views/Notifications";

// Design (const)
const { Header } = Layout;

const NavHeader = () => {
  const dispatch = useDispatch();
  const accInfo = useSelector(state => state.info);
  const menuCollapsed = useSelector(state => state.menu.menuCollapsed);
  return (
    <Header style={{ background: "#fff", padding: 0 }}>
      <LegacyIcon
        className="trigger"
        type={menuCollapsed ? "menu-unfold" : "menu-fold"}
        onClick={() => dispatch({type: "MENU_COLLAPSE"})}
      />
      <div className="right-header-menu">
        <Notifications />
        <AccountMenu name={accInfo.user_name || "Logged User"} />
      </div>
    </Header>
  );
};

export default NavHeader;
