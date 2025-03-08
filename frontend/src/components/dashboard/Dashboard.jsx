import React from "react";
import { Card, Row, Col, Statistic, Table } from "antd";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
  SolutionOutlined,
  ProfileOutlined,
  UserOutlined,
  FileDoneOutlined,
  FileSyncOutlined,
  FileTextOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  ToolOutlined,
} from "@ant-design/icons";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Sample JSON Data for Cards
const cardData = [
    { title: "Leads", value: 24, icon: <SolutionOutlined />, path: "/leads" },
    { title: "Opportunities", value: 1, icon: <ProfileOutlined />, path: "/opportunities" },
    { title: "Accounts", value: 2, icon: <UserOutlined />, path: "/accounts" },
    { title: "Key Accounts", value: 0, icon: <FileDoneOutlined />, path: "/key-accounts" },
    { title: "Enquiry", value: 7, icon: <FileSyncOutlined />, path: "/enquiry-wip" },
    { title: " WIP", value: 7, icon: <FileSyncOutlined />, path: "/wip" },
    { title: "Proforma", value: 20, icon: <FileTextOutlined />, path: "/proforma" },
    { title: "Invoice", value: 0, icon: <DollarOutlined />, path: "/invoice" },
    { title: "Rate Card", value: 0, icon: <ShoppingCartOutlined />, path: "/rate-card" },
    { title: "Maintenance", value: 5, icon: <ToolOutlined />, path: "/maintenance" },
  ];

// // Sales Data for Chart
// const salesData = [
//   { name: "Jan", sales: 4000, profit: 2400, leads: 10 },
//   { name: "Feb", sales: 5000, profit: 2800, leads: 15 },
//   { name: "Mar", sales: 6000, profit: 3500, leads: 20 },
//   { name: "Apr", sales: 7500, profit: 4200, leads: 30 },
//   { name: "May", sales: 9000, profit: 5000, leads: 40 },
// ];

// // Recent Orders Table Data
// const recentOrders = [
//   { key: "1", orderId: "001", customer: "John Doe", total: "$150", status: "Completed", courier: "FedEx" },
//   { key: "2", orderId: "002", customer: "Jane Smith", total: "$230", status: "Pending", courier: "UPS" },
//   { key: "3", orderId: "003", customer: "David Lee", total: "$120", status: "Cancelled", courier: "DHL" },
// ];

// // Table Columns
// const columns = [
//   { title: "Order ID", dataIndex: "orderId", key: "orderId" },
//   { title: "Customer", dataIndex: "customer", key: "customer" },
//   { title: "Total", dataIndex: "total", key: "total" },
//   { title: "Status", dataIndex: "status", key: "status" },
//   { title: "Courier", dataIndex: "courier", key: "courier" },
// ];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 24 }}>
      {/* Animated Core Cards with CountUp */}
      <Row gutter={[16, 16]}>
        {cardData.map((card, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <Card
                hoverable
                onClick={() => navigate(card.path)}
                style={{
                  textAlign: "center",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h2 style={{ fontSize: "24px", color: "#1890ff" }}>{card.icon}</h2>
                    {card.title}
                  </div>
                  <Statistic
                    value={card.value}
                    valueStyle={{ fontSize: "36px", fontWeight: "bold", color: "#333" }}
                    formatter={(value) => <CountUp start={0} end={value} duration={2} />}
                  />
                </div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Charts and Table */}
      {/* <Row gutter={16} style={{ marginTop: 24 }}>
        <Col xs={24} md={16}>
          <Card title="Sales, Profit & Leads Analysis">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" name="Sales" />
                <Bar dataKey="profit" fill="#82ca9d" name="Profit" />
                <Bar dataKey="leads" fill="#ff7300" name="Leads" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Recent Orders">
            <Table dataSource={recentOrders} columns={columns} pagination={false} />
          </Card>
        </Col>
      </Row> */}
    </div>
  );
};

export default Dashboard;
