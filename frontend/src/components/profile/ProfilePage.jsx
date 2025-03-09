import React, { useState } from "react";
import {
  Card,
  Table,
  Input,
  Upload,
  Button,
  Row,
  Col,
  Form,
  DatePicker,
  Segmented,
  Image,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    personal: {
      firstName: "",
      lastName: "",
      dob: null,
      weddingAnniversary: null,
      personalEmail: "",
      officialEmail: "",
      contact: "",
      alternativeContact: "",
      emergencyContact: "",
      emergencyNumber: "",
      bloodGroup: "",
      medicalConditions: "",
    },
    company: {
      designation: "Intern",
      department: "",
      joiningDate: null,
      employmentType: "",
      currentSalary: "",
    },
    bank: {
      bankName: "",
      branch: "",
      accountNumber: "",
      ifsc: "",
      pan: "",
      accountType: "",
    },
    documents: {
      profilePhoto: null,
      resume: null,
      aadhar: null,
      pancard: null,
    },
  });

  const [activeSegment, setActiveSegment] = useState("bankDetails"); // State for active segment

  const handleChange = (section, field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value,
      },
    }));
  };

  const handleDocumentUpload = (file, field) => {
    if (file.size > 1048576) {
      // 1MB in bytes
      message.error("File size must be below 1MB");
      return false;
    }
    handleChange("documents", field, file);
    return false; // Prevent automatic upload
  };

  const handleSaveDocuments = () => {
    console.log("Documents to be saved:", formData.documents);
    message.success("Documents saved successfully!");
  };

  const handleSubmit = (values) => {
    console.log("Form Data Submitted:", formData);
    message.success("Profile updated successfully!");
  };

  const bankColumns = [
    { title: "#", dataIndex: "id", key: "id" },
    { title: "Details", dataIndex: "label", key: "label" },
    { title: "Information", dataIndex: "value", key: "value" },
  ];

  const bankData = [
    {
      id: 1,
      label: "Bank Name",
      value: formData.bank.bankName || "Enter your details",
    },
    {
      id: 2,
      label: "Account Number",
      value: formData.bank.accountNumber || "Enter your details",
    },
    { id: 3, label: "IFSC", value: formData.bank.ifsc || "Enter your details" },
    {
      id: 4,
      label: "PAN Number",
      value: formData.bank.pan || "Enter your details",
    },
  ];

  return (
    <div style={{ padding: 20, background: "#F5F5F5" }}>
      <Row gutter={16}>
        {/* Left Column: Profile Info */}
        <Col xs={24} sm={8}>
          <Card style={{ textAlign: "center" }}>
            <img
              src={
                formData.documents.profilePhoto
                  ? URL.createObjectURL(formData.documents.profilePhoto)
                  : "profile.jpg"
              }
              alt="Profile"
              style={{ width: 100, borderRadius: "50%" }}
            />
            <h3>
              {formData.personal.firstName} {formData.personal.lastName}
            </h3>
            <p>@Intern | {formData.company.department}</p>
            <p>
              <strong>Employee ID:</strong> {formData.personal.employeeId}
            </p>
            <p>
              <strong>Mobile:</strong> {formData.personal.contact}
            </p>
            <p>
              <strong>Email:</strong> {formData.personal.personalEmail}
            </p>
            <p>
              <strong>Location:</strong> {formData.personal.location}
            </p>
          </Card>

          {/* Emergency Details */}
          <Card title="Emergency Details" style={{ marginTop: 16 }}>
            <p>
              <strong>Emergency Contact:</strong>{" "}
              {formData.personal.emergencyContact}
            </p>
            <p>
              <strong>Blood Group:</strong> {formData.personal.bloodGroup}
            </p>
            <p>
              <strong>Allergies:</strong> {formData.personal.medicalConditions}
            </p>
          </Card>

          {/* Other Details */}
          <Card title="Other Details" style={{ marginTop: 16 }}>
            <p>
              <strong>Joining Date:</strong>{" "}
              {formData.company.joiningDate?.format("DD-MM-YYYY") || "N/A"}
            </p>
            <p>
              <strong>Current Salary:</strong>{" "}
              {formData.company.currentSalary || "/Per annum"}
            </p>
            <p>
              <strong>Next Appraisal:</strong> 01-01-1970
            </p>
          </Card>
        </Col>

        {/* Right Column: Segmented Control */}
        <Col xs={24} sm={16}>
          <Card>
            {/* Segmented Control */}
            <Segmented
              options={[
                { label: "Bank Details", value: "bankDetails" },
                { label: "Documents", value: "documents" },
                { label: "Personal Details", value: "personalDetails" },
                { label: "Company Details", value: "companyDetails" },
                { label: "Bank Details", value: "bank" },
              ]}
              value={activeSegment}
              onChange={setActiveSegment}
              block
              style={{ marginBottom: 16 }}
            />

            {/* Content based on active segment */}
            {activeSegment === "bankDetails" && (
              <>
                <h3>Bank Details</h3>
                <Table
                  dataSource={bankData}
                  columns={bankColumns}
                  pagination={false}
                />
              </>
            )}

            {activeSegment === "documents" && (
              <>
                <h3>Documents</h3>
                <Form layout="vertical">
                  {/* Profile Photo */}
                  <Form.Item label="Profile Photo *">
                    <Upload
                      beforeUpload={(file) =>
                        handleDocumentUpload(file, "profilePhoto")
                      }
                      showUploadList={false}
                    >
                      <Button icon={<UploadOutlined />}>Choose File</Button>
                    </Upload>
                    <p style={{ color: "gray" }}>File size below 1MB</p>
                  </Form.Item>

                  {/* Resume */}
                  <Form.Item label="Upload Resume *">
                    <Upload
                      beforeUpload={(file) => handleDocumentUpload(file, "resume")}
                      showUploadList={false}
                    >
                      <Button icon={<UploadOutlined />}>Choose File</Button>
                    </Upload>
                    <p style={{ color: "gray" }}>
                      PDF Format, File size below 1MB
                    </p>
                  </Form.Item>

                  {/* Address Proof (Aadhar) */}
                  <Form.Item label="Address Proof (Aadhar) *">
                    <Upload
                      beforeUpload={(file) =>
                        handleDocumentUpload(file, "aadhar")
                      }
                      showUploadList={false}
                    >
                      <Button icon={<UploadOutlined />}>Choose File</Button>
                    </Upload>
                    <p style={{ color: "gray" }}>
                      PDF Format, File size below 1MB
                    </p>
                  </Form.Item>

                  {/* Identity Proof (Pancard) */}
                  <Form.Item label="Identity Proof (Pancard) *">
                    <Upload
                      beforeUpload={(file) =>
                        handleDocumentUpload(file, "pancard")
                      }
                      showUploadList={false}
                    >
                      <Button icon={<UploadOutlined />}>Choose File</Button>
                    </Upload>
                    <p style={{ color: "gray" }}>
                      PDF Format, File size below 1MB
                    </p>
                  </Form.Item>

                  {/* Save Profile Button */}
                  <Form.Item>
                    <Button type="primary" onClick={handleSaveDocuments}>
                      Save Profile
                    </Button>
                  </Form.Item>
                </Form>
              </>
            )}

            {activeSegment === "personalDetails" && (
              <>
                <h3>Edit Personal Information</h3>
                <Form layout="vertical" onFinish={handleSubmit}>
                  <Form.Item label="First Name">
                    <Input
                      value={formData.personal.firstName}
                      onChange={(e) =>
                        handleChange("personal", "firstName", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Last Name">
                    <Input
                      value={formData.personal.lastName}
                      onChange={(e) =>
                        handleChange("personal", "lastName", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Date of Birth">
                    <DatePicker
                      style={{ width: "100%" }}
                      value={formData.personal.dob}
                      onChange={(date) =>
                        handleChange("personal", "dob", date)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Wedding Anniversary">
                    <DatePicker
                      style={{ width: "100%" }}
                      value={formData.personal.weddingAnniversary}
                      onChange={(date) =>
                        handleChange("personal", "weddingAnniversary", date)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Personal Email">
                    <Input
                      type="email"
                      value={formData.personal.personalEmail}
                      onChange={(e) =>
                        handleChange("personal", "personalEmail", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Official Email">
                    <Input
                      type="email"
                      value={formData.personal.officialEmail}
                      onChange={(e) =>
                        handleChange("personal", "officialEmail", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Contact">
                    <Input
                      value={formData.personal.contact}
                      onChange={(e) =>
                        handleChange("personal", "contact", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Alternative Contact">
                    <Input
                      value={formData.personal.alternativeContact}
                      onChange={(e) =>
                        handleChange("personal", "alternativeContact", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Emergency Contact">
                    <Input
                      value={formData.personal.emergencyContact}
                      onChange={(e) =>
                        handleChange("personal", "emergencyContact", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Emergency Number">
                    <Input
                      value={formData.personal.emergencyNumber}
                      onChange={(e) =>
                        handleChange("personal", "emergencyNumber", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Blood Group">
                    <Input
                      value={formData.personal.bloodGroup}
                      onChange={(e) =>
                        handleChange("personal", "bloodGroup", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Medical Conditions">
                    <Input
                      value={formData.personal.medicalConditions}
                      onChange={(e) =>
                        handleChange("personal", "medicalConditions", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Button type="primary" htmlType="submit">
                    Save Changes
                  </Button>
                </Form>
              </>
            )}

            {activeSegment === "companyDetails" && (
              <>
                <h3>Edit Company Information</h3>
                <Form layout="vertical" onFinish={handleSubmit}>
                  <Form.Item label="Designation">
                    <Input
                      value={formData.company.designation}
                      onChange={(e) =>
                        handleChange("company", "designation", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Department">
                    <Input
                      value={formData.company.department}
                      onChange={(e) =>
                        handleChange("company", "department", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Joining Date">
                    <DatePicker
                      style={{ width: "100%" }}
                      value={formData.company.joiningDate}
                      onChange={(date) =>
                        handleChange("company", "joiningDate", date)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Employment Type">
                    <Input
                      value={formData.company.employmentType}
                      onChange={(e) =>
                        handleChange("company", "employmentType", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Current Salary">
                    <Input
                      value={formData.company.currentSalary}
                      onChange={(e) =>
                        handleChange("company", "currentSalary", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Button type="primary" htmlType="submit">
                    Save Changes
                  </Button>
                </Form>
              </>
            )}

            {activeSegment === "bank" && (
              <>
                <h3>Edit Bank Information</h3>
                <Form layout="vertical" onFinish={handleSubmit}>
                  <Form.Item label="Bank Name">
                    <Input
                      value={formData.bank.bankName}
                      onChange={(e) =>
                        handleChange("bank", "bankName", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Branch">
                    <Input
                      value={formData.bank.branch}
                      onChange={(e) =>
                        handleChange("bank", "branch", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Account Number">
                    <Input
                      value={formData.bank.accountNumber}
                      onChange={(e) =>
                        handleChange("bank", "accountNumber", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="IFSC">
                    <Input
                      value={formData.bank.ifsc}
                      onChange={(e) =>
                        handleChange("bank", "ifsc", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="PAN">
                    <Input
                      value={formData.bank.pan}
                      onChange={(e) =>
                        handleChange("bank", "pan", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Account Type">
                    <Input
                      value={formData.bank.accountType}
                      onChange={(e) =>
                        handleChange("bank", "accountType", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Button type="primary" htmlType="submit">
                    Save Changes
                  </Button>
                </Form>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;