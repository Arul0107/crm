const express = require("express");
const { registerUser, getUsers, updateUser, deleteUser, getDepartments } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/departments", getDepartments); // Fetch departments

module.exports = router;
