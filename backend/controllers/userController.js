const User = require("../models/User");
const bcrypt = require("bcryptjs");

const departmentIds = {
  Engineering: "D001",
  HR: "D002",
  Finance: "D003",
  Marketing: "D004",
  Operations: "D005",
};

// Generate Employee ID
const generateEmployeeId = async () => {
  const count = await User.countDocuments();
  return `Acc${(count + 1).toString().padStart(3, "0")}`;
};

// Get Departments
const getDepartments = async (req, res) => {
  try {
    const departments = Object.keys(departmentIds).map((name) => ({
      name,
      id: departmentIds[name],
    }));
    res.json(departments);
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

// Register User
const registerUser = async (req, res) => {
  try {
    const { personal, company, bank } = req.body;
    const userExists = await User.findOne({ "personal.email": personal.email });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    const employeeId = await generateEmployeeId();
    const password = `Acculer${new Date().getFullYear()}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const departmentId = departmentIds[company.department] || "D999";

    const newUser = new User({
      employeeId,
      password: hashedPassword,
      personal,
      company: { ...company, departmentId },
      bank,
    });

    await newUser.save();
    res.status(201).json({ msg: "User registered successfully", employeeId, password, departmentId });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ msg: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

module.exports = { getDepartments, registerUser, getUsers, updateUser, deleteUser };
