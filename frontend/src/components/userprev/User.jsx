import React, { useState, useEffect } from "react";
import { Table, Select, Button, Space, Grid, Modal, Input } from "antd";
import axios from "axios";
import "./User.css";

const { Option } = Select;
const { useBreakpoint } = Grid;

const User = () => {
  const screens = useBreakpoint();
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/employees");
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setEditingUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handlePrivilegeChange = (privilege, value) => {
    setEditingUser((prevUser) => ({
      ...prevUser,
      permissions: {
        ...prevUser.permissions,
        [privilege]: value,
      },
    }));
  };

  const handleEdit = (user) => {
    setEditingUser({ ...user });
    setIsModalVisible(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/employees/${editingUser._id}/permissions`, {
        permissions: editingUser.permissions,
      });
      fetchUsers();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to update user permissions:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/employees/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const renderPrivilegesTable = (privileges) => {
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
            value={editingUser?.permissions?.[record.privilege]}
            onChange={(value) => handlePrivilegeChange(record.privilege, value)}
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
      render: (_, __, index) => index + 1,
    },
    {
      title: "User ID",
      dataIndex: "employeeId",
      key: "employeeId",
      align: "center",
    },
    {
      title: "User Name",
      dataIndex: "personalInfo.firstName",
      key: "name",
      align: "center",
      render: (text, record) => `${record.personalInfo.firstName} ${record.personalInfo.lastName}`,
    },
    {
      title: "Department",
      dataIndex: "companyInfo.department",
      key: "department",
      align: "center",
    },
    {
      title: "Role",
      dataIndex: "companyInfo.designation",
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
          <Button danger onClick={() => handleDelete(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="user-container" style={{ backgroundColor: "white" }}>
      <h2 style={{ textAlign: "center" }}>User Privileges</h2>
      <div className="table-wrapper">
        <Table columns={columns} dataSource={users} pagination={false} />
      </div>

      <Modal
        title="Edit User Details"
        open={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        {editingUser && (
          <>
            <h3>User ID</h3>
            <Input
              value={editingUser.employeeId}
              onChange={(e) => handleInputChange("employeeId", e.target.value)}
            />

            <h3>Name</h3>
            <Input
              value={`${editingUser.personalInfo.firstName} ${editingUser.personalInfo.lastName}`}
              disabled
            />

            <h3>Department</h3>
            <Input
              value={editingUser.companyInfo.department}
              disabled
            />

            <h3>Role</h3>
            <Input
              value={editingUser.companyInfo.designation}
              disabled
            />

            <h3 style={{ marginTop: "20px" }}>Privileges</h3>
            {renderPrivilegesTable(editingUser.permissions)}
          </>
        )}
      </Modal>
    </div>
  );
};

export default User;