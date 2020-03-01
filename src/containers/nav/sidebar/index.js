import React from "react";

// Router
import { Link, withRouter } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";

import { Icon as LegacyIcon } from '@ant-design/compatible';

// Design
import { Layout, Menu } from "antd";
import "./sidebar.css";

// Sidebar menu
import { sidebarMenu } from "../../../constant/sidebarMenu";

// Helpers
import { useWindowDimensions } from "../../../helper/useWindow";

// Design (const)
const { SubMenu } = Menu;
const { Sider } = Layout;

const Sidebar = props => {
  const dispatch = useDispatch();
  const { location } = props;

  const menuCollapsed = useSelector(state => state.menu.menuCollapsed);

  const { width } = useWindowDimensions();

  return (
    <Sider
      className="sidebar"
      collapsed={menuCollapsed}
      collapsedWidth={width >= 768 ? "80" : "0"}
      onCollapse={() => dispatch({ type: "MENU_COLLAPSE" })}
      theme="dark"
      breakpoint="lg"
      onBreakpoint={broken => {
        broken
          ? dispatch({ type: "MOBILE_MENU" })
          : dispatch({ type: "DESKTOP_MENU" });
      }}
    >
      <div className={menuCollapsed ? "logo-mobile" : "logo"} />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        className="sidebar-menu"
      >
        {sidebarMenu.map(item => {
          if (!item.subMenu) {
            return (
              <Menu.Item key={item.link} className="sidebar-menu-item">
                <LegacyIcon type={item.icon} theme={item.theme} />
                <span>{item.label}</span>
                <Link to={item.link} />
              </Menu.Item>
            );
          } else {
            return (
              <SubMenu
                key={item.link}
                className="sidebar-submenu-container"
                title={
                  <span>
                    <LegacyIcon
                      className="sidebar-menu-item"
                      type={item.icon}
                      theme={item.theme}
                    />
                    <span className="sidebar-menu-item">{item.label}</span>
                  </span>
                }
              >
                {item.subItems.map(sub => {
                  return (
                    <Menu.Item className="sidebar-submenu-item" key={sub.link}>
                      {sub.label}
                      <Link to={sub.link} />
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          }
        })}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          className="sidebar-menu"
          style={{ position: "absolute", bottom: "0" }}
        >
          {" "}
          <Menu.Item key={2} className="sidebar-menu-item">
            <span>Collapse</span>
          </Menu.Item>
        </Menu>
      </Menu>
    </Sider>
  );
};

export default withRouter(Sidebar);
