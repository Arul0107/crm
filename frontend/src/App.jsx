import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/sidebar/AppLayout";
import Dashboard from "./components/dashboard/Dashboard";
import User from "./components/userprev/User";
import AddUser from "./components/Adduser/AddUser";
import ProfilePage from "./components/profile/ProfilePage";
import Viewuser from "./components/Adduser/Viewuser";
import Report from "./components/report/Report";
import Login from "./components/login/Login";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div>
       <Toaster position="top-right" />
  <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <PrivateRoute>
            <AppLayout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/user" element={<User />} />
                <Route path="/add-user" element={<AddUser />} />
                <Route path="/view-users" element={<Viewuser />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/report" element={<Report />} />
              </Routes>
            </AppLayout>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
    </div>
  
  );
};

export default App;
