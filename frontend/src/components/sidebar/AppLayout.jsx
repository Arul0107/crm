import React, { useState, useEffect } from "react";
import { Layout, Menu, Avatar, Dropdown, Breadcrumb, Spin } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  DashboardOutlined,
  LockFilled,
  UserOutlined,
  UserAddOutlined,
  EyeFilled,
  AppstoreOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import logo from "../../assets/Acculer-Logo/Primary Logo 01.png";

const { Header, Sider, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [userPermissions, setUserPermissions] = useState({});

  useEffect(() => {
    const fetchUserPermissions = async () => {
      try {
        const response = await axios.get("/api/employees/your-employee-id/permissions");
        setUserPermissions(response.data);
        setMenuItems(getFilteredMenuItems(response.data));
      } catch (error) {
        console.error("Failed to fetch user permissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPermissions();
  }, []);

  const getFilteredMenuItems = (permissions) => {
    const allMenuItems = [
      { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard", path: "/dashboard" },
      { key: "user", icon: <LockFilled />, label: "Privilege", path: "/user" },
      {
        key: "userDetails",
        icon: <UserOutlined />,
        label: "User Management",
        children: [
          { key: "addUser", label: "Add User", icon: <UserAddOutlined />, path: "/add-user" },
          { key: "viewUsers", label: "View Users", icon: <EyeFilled />, path: "/view-users" },
        ],
      },
      { key: "report", icon: <AppstoreOutlined />, label: "Report", path: "/report" },
      { key: "profile", icon: <UserOutlined />, label: "Profile", path: "/profile" },
      { key: "analytics", icon: <AppstoreOutlined />, label: "Analytics", path: "/reports/analytics" },
      { key: "generalSettings", icon: <SettingOutlined />, label: "General Settings", path: "/settings/general" },
      { key: "security", icon: <SettingOutlined />, label: "Security", path: "/settings/security" },
      { key: "notifications", icon: <SettingOutlined />, label: "Notifications", path: "/settings/notifications" },
    ];

    return allMenuItems
      .map((item) => {
        if (item.children) {
          const filteredChildren = item.children.filter((child) => permissions[child.key] !== "none");
          return filteredChildren.length > 0 ? { ...item, children: filteredChildren } : null;
        }
        return permissions[item.key] !== "none" ? item : null;
      })
      .filter(Boolean);
  };

  const selectedKey = menuItems.find((item) => item.path === location.pathname)?.key || "dashboard";

  const handleMenuClick = ({ key }) => {
    const selectedItem = menuItems.find((item) => item.key === key);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => navigate("/profile")}>
        Profile
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const generateBreadcrumbs = () => {
    const pathParts = location.pathname.split("/").filter((part) => part);
    return pathParts.map((part, index) => ({
      path: `/${pathParts.slice(0, index + 1).join("/")}`,
      label: part.charAt(0).toUpperCase() + part.slice(1),
    }));
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={250} style={{ background: "#fff", overflow: "auto", height: "100vh", position: "fixed", left: 0 }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "16px" }}>
          <img src={logo} alt="CRM Logo" style={{ width: "150px" }} />
        </div>
        <Menu theme="light" mode="inline" selectedKeys={[selectedKey]} onClick={handleMenuClick}>
          {menuItems.map((item) =>
            item.children ? (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((subItem) => (
                  <Menu.Item key={subItem.key} onClick={() => navigate(subItem.path)}>
                    {subItem.icon} {subItem.label}
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon} onClick={() => navigate(item.path)}>
                {item.label}
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>

      <Layout style={{ marginLeft: 250 }}>
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
            justifyContent: "space-between",
          }}
        >
          <Breadcrumb>
            <Breadcrumb.Item key="home" onClick={() => navigate("/")}>
              Home
            </Breadcrumb.Item>
            {generateBreadcrumbs().map((breadcrumb) => (
              <Breadcrumb.Item key={breadcrumb.path} onClick={() => navigate(breadcrumb.path)}>
                {breadcrumb.label}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <Dropdown overlay={userMenu} placement="bottomRight">
            <div style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: "10px" }}>
              <Avatar src="https://your-image-url.com/avatar.png" />
              <span style={{ fontWeight: "bold" }}>John Doe</span>
            </div>
          </Dropdown>
        </Header>

        <Content style={{ marginTop: 64, padding: 24, minHeight: "calc(100vh - 112px)" }}>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <Spin size="large" />
            </div>
          ) : (
            children
          )}
        </Content>

        <Footer style={{ textAlign: "center" }}>© 2025 Your CRM System</Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
