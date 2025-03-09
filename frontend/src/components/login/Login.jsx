  // FRONTEND: React Vite Super Admin Login Integration
  // Backend API: http://localhost:5000/api/users

  import { useState } from "react";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  import "./Login.css";

  const API_URL = "http://localhost:5000/api/users";

  // Get Super Admin Credentials from .env file
  const SUPER_ADMIN_EMAIL = import.meta.env.VITE_SUPER_ADMIN_EMAIL;
  const SUPER_ADMIN_PASSWORD = import.meta.env.VITE_SUPER_ADMIN_PASSWORD;


  const Login = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate();
    
      const handleLogin = async (e) => {
          e.preventDefault();
          try {
            if (email === SUPER_ADMIN_EMAIL && password === SUPER_ADMIN_PASSWORD) {
              localStorage.setItem("token", "superadmin-token");
              alert("Super Admin Login successful");
              navigate("/dashboard");
            } else {
              const res = await axios.post(`${API_URL}/login`, { email, password });
              console.log("API Response:", res.data); // Debugging
        
              if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                alert("Login successful");
                navigate("/dashboard");
              } else {
                alert("No token received from the server");
              }
            }
          } catch (err) {
            console.error("Login error:", err.response?.data || err.message);
            alert("Invalid Credentials");
          }
        };
        
      return (
        <div className="login-container">
          <h2>Super Admin Login</h2>
          <form onSubmit={handleLogin} className="login-form">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
          </form>
        </div>
      );
    };
    
    export default Login;
    
