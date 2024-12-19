// employee controller
const Employee = require('./employeeModel');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Define allowed fields for update
const allowedUpdateFields = [
  'name',
  'phone',
  'address',
  'city',
  'state',
  'profileImage',
  'endDate',
  'isEmployed',
  'wage',
  'emergencyContacts',
];

// Function to check if a string contains at least one digit and one special character
function isPasswordValid(password) {
  const digitRegex = /\d/;
  const specialCharRegex = /[!@#$%^&*]/;

  return (
    password.length >= 10 &&
    digitRegex.test(password) &&
    specialCharRegex.test(password)
  );
}

// Function to validate update fields
const validateUpdateFields = (updateFields) => {
  return Object.keys(updateFields).every((field) =>
    allowedUpdateFields.includes(field)
  );
};

/// Create new employee
const createEmployee = async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    googleId,
    facebookId,
    facebookDisplayName,
    facebookEmail,
    photo,
    phone,
    address,
    city,
    state,
    endDate,
    isEmployed,
    wage,
    emergencyContacts,
  } = req.body;

  try {
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    if (googleId || facebookId) {
      const newEmployee = new User({
        googleId,
        facebookId,
        facebookDisplayName,
        facebookEmail,
        name,
        email,
        photo,
        phone,
        address,
        city,
        state,
        endDate,
        isEmployed,
        wage,
        emergencyContacts,
      });

      await newEmployee.save();

      const token = jwt.sign({ _id: newEmployee._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return res.status(201).json({
        message: 'New agent created successfully via OAuth.',
        employee: newEmployee,
        token,
        redirectTo: `https://chimera-green.vercel.app/employees/${newEmployee._id}`,
      });
    }

    if (!password || !confirmPassword) {
      return res.status(400).json({ message: 'Password is required.' });
    }

    if (!isPasswordValid(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 10 characters long and contain at least one number and one special character.',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newEmployee = new Employee({
      name,
      email,
      password: hashedPassword,
      photo,
      phone,
      address,
      city,
      state,
      endDate,
      isEmployed,
      wage,
      emergencyContacts,
    });

    await newEmployee.save();

    const token = jwt.sign({ _id: newEmployee._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({
      message: 'New agent created successfully.',
      employee: newEmployee,
      token,
      redirectTo: `https://chimera-green.vercel.app/profile/${newEmployee._id}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Fetch all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Fetch employee by id
const getEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
// update employee
const updateEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Update Request Body:', req.body);
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedEmployee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    console.log('Updated Employee:', updatedEmployee);
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error('Update Error:', error);
    res
      .status(500)
      .json({ message: 'Failed to update employee', error: error.message });
  }
};
const deleteEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to delete admin', error: error.message });
  }
};

// Time off request functions
const requestTimeOff = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const { startDate, endDate, reason } = req.body;

    if (!startDate || !endDate || !reason) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const timeOffRequest = { startDate, endDate, reason };
    employee.timeOffRequests.push(timeOffRequest);
    const updatedEmployee = await employee.save();
    res.status(201).json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Update timeoff request
const updateTimeOffRequest = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const requestId = req.params.requestId;
    const updatedRequest = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const requestIndex = employee.timeOffRequests.findIndex(
      (request) => request._id.toString() === requestId
    );

    if (requestIndex === -1) {
      return res.status(404).json({ error: 'Time off request not found' });
    }

    employee.timeOffRequests[requestIndex] = {
      ...employee.timeOffRequests[requestIndex],
      ...updatedRequest,
    };

    const updatedEmployee = await employee.save();
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Delete time off request
const deleteTimeOffRequest = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const requestId = req.params.requestId;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const requestIndex = employee.timeOffRequests.findIndex(
      (request) => request._id.toString() === requestId
    );

    if (requestIndex === -1) {
      return res.status(404).json({ error: 'Time off request not found' });
    }

    employee.timeOffRequests.splice(requestIndex, 1);

    const updatedEmployee = await employee.save();
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Register new employee

const register = async (req, res) => {
  const { email, password, confirmPassword, name } = req.body;

  try {
    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    if (!isPasswordValid(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 10 characters long and contain at least one number and one special character.',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: 'Password and password confirmation do not match.',
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newEmployee = new Employee({
      email,
      password: hashedPassword,
      name,
    });
    await newEmployee.save();

    const token = jwt.sign({ _id: newEmployee._id }, process.env.JWT_SECRET);

    res.status(201).json({
      message: 'New employee registered successfully',
      employee: newEmployee,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Login an existing agent
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const email = await Employee.findOne({ email });

    if (!Employee) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, Employee.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ _id: Employee._id }, process.env.JWT_SECRET);
    const redirectTo = `https://chimera-green.vercel.app/profile/${Employee._id}`;
    console.log('Generated Token:', token);

    res
      .status(200)
      .json({ message: 'Login successful', agent, token, redirectTo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Logout a user
const logout = async (req, res) => {
  try {
    if (req.user?.oauthProvider) {
      const redirectUrl = getOAuthLogoutUrl(req.user.oauthProvider);

      res.clearCookie('token');

      return res.status(200).json({
        message: 'Logged out successfully via OAuth.',
        redirectTo: redirectUrl,
      });
    }

    res.clearCookie('token');
    return res.status(200).json({
      message: 'Logged out successfully.',
      redirectTo: 'https://chimera-green.vercel.app/login',
    });
  } catch (error) {
    console.error('Error during logout:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error during logout.' });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
  requestTimeOff,
  updateTimeOffRequest,
  deleteTimeOffRequest,
  register,
  login,
  logout,
};

{
  /*
const Employee = require('./employeeModel');

const createEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateEmployeeById = async (req, res) => {
  try {
    const updateFields = req.body;

    // Validate fields
    if (!validateUpdateFields(updateFields)) {
      return res.status(400).json({ error: 'Invalid fields for update' });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteEmployeeById = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndRemove(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
};

*/
}
