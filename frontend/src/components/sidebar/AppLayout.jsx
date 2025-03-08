import React from "react";
import { Layout, Menu, Avatar, Dropdown } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  SettingOutlined,
  AppstoreOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/Acculer-Logo/Primary Logo 01.png";

const { Header, Sider, Content, Footer } = Layout;

// Define Menu Items Without Nested Children
const menuItems = [
  { key: "1", icon: <DashboardOutlined />, label: "Dashboard", path: "/dashboard" },
  { key: "2", icon: <MailOutlined />, label: " User Privileges", path: "/user" },
  { key: "3", icon: <MailOutlined />, label: "Sent", path: "/messages/sent" },
  { key: "4", icon: <MailOutlined />, label: "Drafts", path: "/messages/drafts" },
  { key: "5", icon: <AppstoreOutlined />, label: "Calendar", path: "/applications/calendar" },
  { key: "6", icon: <AppstoreOutlined />, label: "Tasks", path: "/applications/tasks" },
  { key: "7", icon: <AppstoreOutlined />, label: "Sales Reports", path: "/reports/sales" },
  { key: "8", icon: <AppstoreOutlined />, label: "Analytics", path: "/reports/analytics" },
  { key: "9", icon: <SettingOutlined />, label: "General Settings", path: "/settings/general" },
  { key: "10", icon: <SettingOutlined />, label: "Security", path: "/settings/security" },
  { key: "11", icon: <SettingOutlined />, label: "Notifications", path: "/settings/notifications" },
];

const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Find the selected menu key based on the current path
  const selectedKey = menuItems.find((item) => item.path === location.pathname)?.key || "1";

  // Handle menu navigation
  const handleMenuClick = ({ key }) => {
    const selectedItem = menuItems.find((item) => item.key === key);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
  };

  // User dropdown menu
  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => navigate("/profile")}>
        Profile
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider width={250} style={{ background: "#fff", overflow: "auto", height: "100vh", position: "fixed", left: 0 }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "16px" }}>
          <img src={logo} alt="CRM Logo" style={{ width: "150px" }} />
        </div>
        <Menu theme="light" mode="inline" selectedKeys={[selectedKey]} onClick={handleMenuClick}>
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      <Layout style={{ marginLeft: 250 }}>
        {/* Fixed Header */}
        <Header
          style={{
            position: "fixed",
            width: "calc(100% - 250px)",
            top: 0,
            zIndex: 1000,
            padding: "0 16px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
        <Dropdown overlay={userMenu} placement="bottomRight">
  <div style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: "10px" }}>
    <Avatar src="https://your-image-url.com/avatar.png" /> {/* Use a URL or import an image */}
    <span style={{ fontWeight: "bold" }}>John Doe</span> {/* Replace with dynamic user name */}
  </div>
</Dropdown>

        </Header>

        {/* Main Content */}
        <Content style={{ marginTop: 64, padding: 24, minHeight: "calc(100vh - 112px)" }}>
          {children}
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: "center" }}>© 2025 Your CRM System</Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
