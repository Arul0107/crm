import React, { useState } from "react";
import { Table, Select, Button, Space } from "antd";
import "./User.css"; // Import CSS for styling

const { Option } = Select;

const User = () => {
  // Sample user data
  const [users, setUsers] = useState([
    {
      key: "1",
      name: "John Doe",
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
      isEditing: false,
    },
  ]);

  // Handle privilege selection change
  const handlePrivilegeChange = (key, privilege, value, type) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.key === key
          ? {
              ...user,
              [type]: {
                ...user[type],
                [privilege]: value,
              },
            }
          : user
      )
    );
  };

  // Toggle edit mode
  const handleEdit = (key) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.key === key ? { ...user, isEditing: !user.isEditing } : user
      )
    );
  };

  // Save edited data
  const handleSave = (key) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.key === key ? { ...user, isEditing: false } : user
      )
    );
  };

  // Delete user
  const handleDelete = (key) => {
    setUsers(users.filter((user) => user.key !== key));
  };

  // Define table columns
  const columns = [
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Privileges",
      dataIndex: "privileges",
      key: "privileges",
      render: (_, record) => (
        <Space wrap>
          {Object.keys(record.privileges).map((privilege) => (
            <div key={privilege} className="privilege-item">
              <span>{privilege}: </span>
              <Select
                value={record.privileges[privilege]}
                disabled={!record.isEditing}
                onChange={(value) =>
                  handlePrivilegeChange(record.key, privilege, value, "privileges")
                }
                style={{ width: 120 }}
              >
                <Option value="none">None</Option>
                <Option value="view">View Only</Option>
                <Option value="edit">Edit</Option>
                <Option value="delete">Delete</Option>
              </Select>
            </div>
          ))}
        </Space>
      ),
    },
    {
      title: "Sidebar Privileges	",
      dataIndex: "additionalPrivileges",
      key: "additionalPrivileges",
      render: (_, record) => (
        <Space wrap>
          {Object.keys(record.additionalPrivileges).map((privilege) => (
            <div key={privilege} className="privilege-item">
              <span>{privilege}: </span>
              <Select
                value={record.additionalPrivileges[privilege]}
                disabled={!record.isEditing}
                onChange={(value) =>
                  handlePrivilegeChange(record.key, privilege, value, "additionalPrivileges")
                }
                style={{ width: 120 }}
              >
                <Option value="none">None</Option>
                <Option value="view">View Only</Option>
                <Option value="edit">Edit</Option>
                <Option value="delete">Delete</Option>
              </Select>
            </div>
          ))}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          {record.isEditing ? (
            <Button type="primary" onClick={() => handleSave(record.key)}>
              Save
            </Button>
          ) : (
            <Button onClick={() => handleEdit(record.key)}>Edit</Button>
          )}
          <Button danger onClick={() => handleDelete(record.key)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="user-container">
      <h2>User Privileges</h2>
      <div className="table-wrapper">
        <Table columns={columns} dataSource={users} pagination={false} />
      </div>
    </div>
  );
};

export default User;