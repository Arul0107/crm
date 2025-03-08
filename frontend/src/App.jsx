import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/sidebar/AppLayout";
import Dashboard from "./components/dashboard/Dashboard";
import User from "./components/userprev/User";

const App = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
