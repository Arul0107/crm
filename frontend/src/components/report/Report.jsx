import React, { useState } from "react";
import {
  Table,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Row,
  Col,
  TimePicker,
  message,
  Drawer,
} from "antd";
import moment from "moment";

const { Option } = Select;

const Report = () => {
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [workReports, setWorkReports] = useState([
    {
      key: 1,
      reportDate: "08-03-2025",
      client: "Acculer Media Technology",
      startEndTime: "2:15 pm - 5:31 pm",
      totalHours: "3 Hours and 16 Minutes",
      status: "developing new crm in react is to convert into new in mrm stack",
      action: "☑",
    },
    {
      key: 2,
      reportDate: "08-03-2025",
      client: "Acculer Media Technology",
      startEndTime: "10:15 am - 1:15 pm",
      totalHours: "3 Hours and 0 Minutes",
      status: "studing the code in current crm php code",
      action: "☑",
    },
    {
      key: 3,
      reportDate: "07-03-2025",
      client: "Sriram Air Compressors (Coimbatore) Private Limited",
      startEndTime: "4:24 pm - 5:30 pm",
      totalHours: "1 Hours and 6 Minutes",
      status:
        "KT from ARAVIND AND SEARCHCHING FOR THE THEME IN PRODUCT CATLOG PAGE",
      action: "☑",
    },
    {
      key: 4,
      reportDate: "07-03-2025",
      client: "Acculer Media Technology",
      startEndTime: "2:10 pm - 3:30 pm",
      totalHours: "1 Hours and 20 Minutes",
      status:
        "KT from Kadhir .get the knowledge for beauty and how to upload the file on the server to make the website live with one file demo.",
      action: "☑",
    },
  ]);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const onFinish = (values) => {
    const {
      reportDate,
      client,
      workType,
      projectDescription,
      startTime,
      endTime,
      description,
    } = values;

    // Calculate total hours
    const start = moment(startTime, "HH:mm");
    const end = moment(endTime, "HH:mm");
    const duration = moment.duration(end.diff(start));
    const totalHours = `${duration.hours()} Hours and ${duration.minutes()} Minutes`;

    // Add new work report
    const newReport = {
      key: workReports.length + 1,
      reportDate: reportDate.format("DD-MM-YYYY"),
      client,
      startEndTime: `${startTime.format("hh:mm A")} - ${endTime.format(
        "hh:mm A"
      )}`,
      totalHours,
      status: description,
      action: "☑",
    };

    setWorkReports([...workReports, newReport]);
    message.success("Work report added successfully!");
    form.resetFields();
  };

  const onEdit = (record) => {
    setSelectedReport(record);
    setIsDrawerVisible(true);
    editForm.setFieldsValue({
      reportDate: moment(record.reportDate, "DD-MM-YYYY"),
      client: record.client,
      startEndTime: moment(record.startEndTime.split(" - ")[0], "hh:mm A"),
      endTime: moment(record.startEndTime.split(" - ")[1], "hh:mm A"),
      description: record.status,
    });
  };

  const onEditFinish = (values) => {
    const { reportDate, client, startTime, endTime, description } = values;

    // Calculate total hours
    const start = moment(startTime, "HH:mm");
    const end = moment(endTime, "HH:mm");
    const duration = moment.duration(end.diff(start));
    const totalHours = `${duration.hours()} Hours and ${duration.minutes()} Minutes`;

    // Update the work report
    const updatedReports = workReports.map((report) =>
      report.key === selectedReport.key
        ? {
            ...report,
            reportDate: reportDate.format("DD-MM-YYYY"),
            client,
            startEndTime: `${startTime.format("hh:mm A")} - ${endTime.format(
              "hh:mm A"
            )}`,
            totalHours,
            status: description,
          }
        : report
    );

    setWorkReports(updatedReports);
    message.success("Work report updated successfully!");
    setIsDrawerVisible(false);
  };

  const columns = [
    { title: "S.no", dataIndex: "key", key: "key" },
    { title: "Report Date", dataIndex: "reportDate", key: "reportDate" },
    { title: "Client", dataIndex: "client", key: "client" },
    {
      title: "Start / End time",
      dataIndex: "startEndTime",
      key: "startEndTime",
    },
    { title: "Total Hours", dataIndex: "totalHours", key: "totalHours" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="link" onClick={() => onEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 20,backgroundColor:"white" }} >
      <h1>Work Report</h1>
      <Row gutter={16}>
        <Col xs={24} md={10}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Report Date"
                  name="reportDate"
                  rules={[
                    { required: true, message: "Please select report date" },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Client"
                  name="client"
                  rules={[{ required: true, message: "Please select client" }]}
                >
                  <Select placeholder="Select Client">
                    <Option value="Acculer Media Technology">
                      Acculer Media Technology
                    </Option>
                    <Option value="Sriram Air Compressors (Coimbatore) Private Limited">
                      Sriram Air Compressors (Coimbatore) Private Limited
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Work Type"
                  name="workType"
                  rules={[
                    { required: true, message: "Please select work type" },
                  ]}
                >
                  <Select placeholder="Select Work Type">
                    <Option value="Development">Development</Option>
                    <Option value="Testing">Testing</Option>
                    <Option value="Meeting">Meeting</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Project Short Description"
                  name="projectDescription"
                  rules={[
                    {
                      required: true,
                      message: "Please enter project description",
                    },
                  ]}
                >
                  <Input.TextArea rows={2} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Start Time"
                  name="startTime"
                  rules={[
                    { required: true, message: "Please select start time" },
                  ]}
                >
                  <TimePicker format="hh:mm A" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="End Time"
                  name="endTime"
                  rules={[
                    { required: true, message: "Please select end time" },
                  ]}
                >
                  <TimePicker format="hh:mm A" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24}>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    { required: true, message: "Please enter description" },
                  ]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col xs={24} md={14}>
          <h2>Today Working Hours:</h2>
          <Table
  columns={columns}
  dataSource={workReports}
  pagination={{
    pageSizeOptions: ["5", "10", "20"],
    showSizeChanger: true,
    defaultPageSize: 5,
    position: ['topRight'], // Only top pagination
  }}
  scroll={{ x: true }}
/>
        </Col>
      </Row>

      <Drawer
        title="Edit Work Report"
        width={720}
        onClose={() => setIsDrawerVisible(false)}
        visible={isDrawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form form={editForm} layout="vertical" onFinish={onEditFinish}>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Report Date"
                name="reportDate"
                rules={[
                  { required: true, message: "Please select report date" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Client"
                name="client"
                rules={[{ required: true, message: "Please select client" }]}
              >
                <Select placeholder="Select Client">
                  <Option value="Acculer Media Technology">
                    Acculer Media Technology
                  </Option>
                  <Option value="Sriram Air Compressors (Coimbatore) Private Limited">
                    Sriram Air Compressors (Coimbatore) Private Limited
                  </Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Start Time"
                name="startTime"
                rules={[
                  { required: true, message: "Please select start time" },
                ]}
              >
                <TimePicker format="hh:mm A" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="End Time"
                name="endTime"
                rules={[{ required: true, message: "Please select end time" }]}
              >
                <TimePicker format="hh:mm A" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24}>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please enter description" },
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24}>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};

export default Report;
