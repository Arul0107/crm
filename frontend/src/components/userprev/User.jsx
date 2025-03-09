import React, { useState } from "react";
import { Table, Select, Button, Space, Grid, Modal } from "antd";
import "./User.css"; // Import CSS for styling

const { Option } = Select;
const { useBreakpoint } = Grid;

const User = () => {
  const screens = useBreakpoint();
  const [users, setUsers] = useState([
    {
      key: "1",
      name: "John Doe",
      role: "Admin",
      privileges: {
        admin: "edit",
        leads: "view",
        opportunities: "none",
        accounts: "edit",
        notes: "none",
        operations: "none",
        payments: "edit",
        users: "none",
        enquiry: "view",
        exportData: "none",
        workorder: "none",
        googleSheet: "view",
      },
      additionalPrivileges: {
        dashboard: "view",
        userPrivileges: "edit",
        sent: "none",
        drafts: "view",
        calendar: "edit",
        tasks: "none",
        salesReports: "view",
        analytics: "none",
        generalSettings: "edit",
        security: "none",
        notifications: "view",
      },
    },
  ]);

  const [editingUser, setEditingUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePrivilegeChange = (privilege, value, type) => {
    setEditingUser((prevUser) => ({
      ...prevUser,
      [type]: {
        ...prevUser[type],
        [privilege]: value,
      },
    }));
  };

  const handleRoleChange = (value) => {
    setEditingUser((prevUser) => ({
      ...prevUser,
      role: value, // Update role
    }));
  };

  const handleEdit = (user) => {
    setEditingUser({ ...user }); // Clone user to avoid state mutation
    setIsModalVisible(true);
  };

  const handleSave = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.key === editingUser.key ? { ...editingUser } : user
      )
    );
    setIsModalVisible(false);
  };

  const handleDelete = (key) => {
    setUsers(users.filter((user) => user.key !== key));
  };

  const renderPrivilegesTable = (privileges, type) => {
    const privilegeColumns = [
      {
        title: "Privilege",
        dataIndex: "privilege",
        key: "privilege",
      },
      {
        title: "Access Level",
        dataIndex: "access",
        key: "access",
        render: (_, record) => (
          <Select
            value={editingUser?.[type]?.[record.privilege]} // Ensure safe access
            onChange={(value) =>
              handlePrivilegeChange(record.privilege, value, type)
            }
            style={{ width: 120 }}
          >
            <Option value="none">None</Option>
            <Option value="view">View</Option>
            <Option value="edit">Edit</Option>
            <Option value="delete">Delete</Option>
          </Select>
        ),
      },
    ];

    const privilegeData = Object.keys(privileges).map((privilege) => ({
      key: privilege,
      privilege,
      access: privileges[privilege],
    }));

    return <Table columns={privilegeColumns} dataSource={privilegeData} pagination={false} />;
  };

  const columns = [
    {
      title: "S.No",
      key: "sno",
      align: "center",
      render: (_, __, index) => index + 1, // Dynamically generate serial number
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.key)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div className="user-container" style={{ backgroundColor:"white" }}>
      <h2 style={{ textAlign: "center" }}>User Privileges</h2>
      <div className="table-wrapper">
        <Table columns={columns} dataSource={users} pagination={false} />
      </div>

      <Modal
        title="Edit User Privileges"
        open={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        {editingUser && (
          <>
            <h3>Role</h3>
            <Select
              value={editingUser.role}
              style={{ width: "100%" }}
              onChange={handleRoleChange} // Allow role editing
            >
              <Option value="Admin">Admin</Option>
              <Option value="Super Admin">Super Admin</Option>
              <Option value="Designer">Designer</Option>
              <Option value="Developer">Developer</Option>
              <Option value="SEO">SEO</Option>
              <Option value="Digital Marketing">Digital Marketing</Option>
              <Option value="Video Editor">Video Editor</Option>
            </Select>

            <h3 style={{ marginTop: "20px" }}>Privileges</h3>
            {renderPrivilegesTable(editingUser.privileges, "privileges")}

            <h3 style={{ marginTop: "20px" }}>Sidebar Privileges</h3>
            {renderPrivilegesTable(editingUser.additionalPrivileges, "additionalPrivileges")}
          </>
        )}
      </Modal>
    </div>
  );
};

export default User;
