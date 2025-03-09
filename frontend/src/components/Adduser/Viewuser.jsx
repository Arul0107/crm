import React, { useState, useEffect } from "react";
import { Table, Button, Drawer, Form, Input, DatePicker, Select, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";

const { Option } = Select;

const departmentOptions = ["Engineering", "HR", "Finance", "Marketing", "Operations"];

const Viewuser = () => {
  const [users, setUsers] = useState([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        message.error("Failed to fetch users. Please try again.");
      }
    };
    fetchUsers();
  }, []);

  // Calculate age from DOB
  const calculateAge = (dob) => {
    return dob ? moment().diff(moment(dob), "years") : "N/A";
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue({
      personal: {
        firstName: user.personal.firstName,
        lastName: user.personal.lastName,
        dob: moment(user.personal.dob), // Convert to moment object
        email: user.personal.email,
        contact: user.personal.contact,
        address: user.personal.address,
      },
      company: {
        ...user.company,
        department: user.company.department, // Ensure department is set
      },
      bank: user.bank,
    });
    setIsDrawerVisible(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      values.personal.dob = values.personal.dob ? values.personal.dob.toISOString() : null; // Convert date

      await axios.put(`http://localhost:5000/api/users/${editingUser._id}`, values);

      const updatedUsers = users.map((user) =>
        user._id === editingUser._id ? { ...user, ...values } : user
      );

      setUsers(updatedUsers);
      message.success("User updated successfully!");
      setIsDrawerVisible(false);
    } catch (error) {
      console.error("Validation Failed:", error);
      message.error("Failed to update user. Please try again.");
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
      message.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Failed to delete user. Please try again.");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "personal",
      render: (personal) => `${personal.firstName} ${personal.lastName}`,
    },
    {
      title: "Age",
      dataIndex: "personal",
      render: (personal) => calculateAge(personal.dob),
    },
    {
      title: "Email",
      dataIndex: "personal",
      render: (personal) => personal.email,
    },
    {
      title: "Contact",
      dataIndex: "personal",
      render: (personal) => personal.contact,
    },
    {
      title: "Designation",
      dataIndex: "company",
      render: (company) => company.designation,
    },
    {
      title: "Department",
      dataIndex: "company",
      render: (company) => company.department,
    },
    {
      title: "Bank",
      dataIndex: "bank",
      render: (bank) => bank.bankName,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ margin: "0 auto" }}>
      <h2>User List</h2>
      <Table dataSource={users} columns={columns} rowKey="_id" />

      <Drawer
        title="Edit User"
        width={500}
        visible={isDrawerVisible}
        onClose={() => {
          setIsDrawerVisible(false);
          form.resetFields(); // Reset form fields on close
        }}
        footer={
          <div style={{ textAlign: "right" }}>
            <Button onClick={() => setIsDrawerVisible(false)} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        }
      >
        <Form form={form} layout="vertical">
          <h3>Personal Information</h3>
          <Form.Item name={["personal", "firstName"]} label="First Name">
            <Input />
          </Form.Item>
          <Form.Item name={["personal", "lastName"]} label="Last Name">
            <Input />
          </Form.Item>
          <Form.Item name={["personal", "dob"]} label="Date of Birth">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name={["personal", "email"]} label="Email">
            <Input />
          </Form.Item>
          <Form.Item name={["personal", "contact"]} label="Contact">
            <Input />
          </Form.Item>
          <Form.Item name={["personal", "address"]} label="Address">
            <Input.TextArea />
          </Form.Item>

          <h3>Company Information</h3>
          <Form.Item name={["company", "designation"]} label="Designation">
            <Input />
          </Form.Item>
          <Form.Item name={["company", "department"]} label="Department">
            <Select>
              {departmentOptions.map((dept) => (
                <Option key={dept} value={dept}>
                  {dept}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={["company", "employmentType"]} label="Employment Type">
            <Select>
              <Option value="Full-Time">Full-Time</Option>
              <Option value="Part-Time">Part-Time</Option>
            </Select>
          </Form.Item>

          <h3>Bank Information</h3>
          <Form.Item name={["bank", "bankName"]} label="Bank Name">
            <Input />
          </Form.Item>
          <Form.Item name={["bank", "accountNumber"]} label="Account Number">
            <Input />
          </Form.Item>
          <Form.Item name={["bank", "ifsc"]} label="IFSC Code">
            <Input />
          </Form.Item>
          <Form.Item name={["bank", "pan"]} label="PAN Number">
            <Input />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Viewuser;