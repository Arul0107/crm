import React, { useState, useEffect } from "react";
import { Form, Input, Button, Steps, Select, DatePicker, Modal } from "antd";
import axios from "axios";
import { toast } from "react-hot-toast";

const { Step } = Steps;
const { Option } = Select;

const AddUser = () => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({
    personal: {
      firstName: "",
      lastName: "",
      dob: null,
      email: "",
      contact: "",
      address: "",
    },
    company: {
      designation: "",
      department: "",
      departmentId: "",
      joiningDate: null,
      employmentType: "",
    },
    bank: {
      bankName: "",
      accountNumber: "",
      ifsc: "",
      pan: "",
    },
  });

  const [departments, setDepartments] = useState([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [userCredentials, setUserCredentials] = useState({ employeeId: "", password: "" });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/departments");
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
        toast.error("Failed to fetch departments.");
      }
    };
    fetchDepartments();
  }, []);

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const handleChange = (step, field, value) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [step]: { ...prev[step], [field]: value } };

      if (step === "company" && field === "department") {
        updatedData.company.departmentId = {
          Engineering: "D001",
          HR: "D002",
          Finance: "D003",
          Marketing: "D004",
          Operations: "D005",
        }[value] || "D999";
      }

      return updatedData;
    });
  };

  const handleSubmit = async () => {
    console.log("Submitting Data:", formData);
    try {
      const response = await axios.post("http://localhost:5000/api/users/register", formData);
      setUserCredentials({
        employeeId: response.data.employeeId,
        password: response.data.password,
      });
      setRegistrationSuccess(true);
      toast.success("User added successfully!");
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      toast.error("Failed to add user. Please try again.");
    }
  };
    
  const steps = [
    {
      title: "Personal Info",
      content: (
        <Form layout="vertical">
          <Form.Item label="First Name">
            <Input value={formData.personal.firstName} onChange={(e) => handleChange("personal", "firstName", e.target.value)} />
          </Form.Item>
          <Form.Item label="Last Name">
            <Input value={formData.personal.lastName} onChange={(e) => handleChange("personal", "lastName", e.target.value)} />
          </Form.Item>
          <Form.Item label="Date of Birth">
            <DatePicker
              style={{ width: "100%" }}
              value={formData.personal.dob}
              onChange={(date) => handleChange("personal", "dob", date)}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input type="email" value={formData.personal.email} onChange={(e) => handleChange("personal", "email", e.target.value)} />
          </Form.Item>
          <Form.Item label="Contact Number">
            <Input value={formData.personal.contact} onChange={(e) => handleChange("personal", "contact", e.target.value)} />
          </Form.Item>
          <Form.Item label="Address">
            <Input.TextArea value={formData.personal.address} onChange={(e) => handleChange("personal", "address", e.target.value)} />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Company Info",
      content: (
        <Form layout="vertical">
          <Form.Item label="Designation">
            <Input value={formData.company.designation} onChange={(e) => handleChange("company", "designation", e.target.value)} />
          </Form.Item>
          <Form.Item label="Department">
            <Select
              value={formData.company.department}
              onChange={(value) => handleChange("company", "department", value)}
              placeholder="Select Department"
            >
              {departments.map((dept) => (
                <Option key={dept} value={dept}>{dept}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Date of Joining">
            <DatePicker
              style={{ width: "100%" }}
              value={formData.company.joiningDate}
              onChange={(date) => handleChange("company", "joiningDate", date)}
            />
          </Form.Item>
          <Form.Item label="Employment Type">
            <Select
              value={formData.company.employmentType}
              onChange={(value) => handleChange("company", "employmentType", value)}
              placeholder="Select Employment Type"
            >
              <Option value="Full-Time">Full-Time</Option>
              <Option value="Part-Time">Part-Time</Option>
            </Select>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Bank Details",
      content: (
        <Form layout="vertical">
          <Form.Item label="Bank Name">
            <Input value={formData.bank.bankName} onChange={(e) => handleChange("bank", "bankName", e.target.value)} />
          </Form.Item>
          <Form.Item label="Account Number">
            <Input value={formData.bank.accountNumber} onChange={(e) => handleChange("bank", "accountNumber", e.target.value)} />
          </Form.Item>
          <Form.Item label="IFSC Code">
            <Input value={formData.bank.ifsc} onChange={(e) => handleChange("bank", "ifsc", e.target.value)} />
          </Form.Item>
          <Form.Item label="PAN Number">
            <Input value={formData.bank.pan} onChange={(e) => handleChange("bank", "pan", e.target.value)} />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Review & Submit",
      content: (
        <div>
          <h3>Review Your Details</h3>
          <p><strong>Name:</strong> {formData.personal.firstName} {formData.personal.lastName}</p>
          <p><strong>Email:</strong> {formData.personal.email}</p>
          <p><strong>Contact:</strong> {formData.personal.contact}</p>
          <p><strong>Designation:</strong> {formData.company.designation}</p>
          <p><strong>Department:</strong> {formData.company.department} (ID: {formData.company.departmentId})</p>
          <p><strong>Bank:</strong> {formData.bank.bankName}</p>
        </div>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Steps current={current}>
        {steps.map((step) => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>

      <div style={{ marginTop: 20 }}>{steps[current].content}</div>

      <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between" }}>
        {current > 0 && <Button onClick={prev}>Previous</Button>}
        {current < steps.length - 1 && <Button type="primary" onClick={next}>Next</Button>}
        {current === steps.length - 1 && <Button type="primary" onClick={handleSubmit}>Submit</Button>}
      </div>

      <Modal
        title="Registration Successful"
        open={registrationSuccess}
        onOk={() => setRegistrationSuccess(false)}
        onCancel={() => setRegistrationSuccess(false)}
      >
        <p><strong>Employee ID:</strong> {userCredentials.employeeId}</p>
        <p><strong>Password:</strong> {userCredentials.password}</p>
      </Modal>
    </div>
  );
};

export default AddUser;
