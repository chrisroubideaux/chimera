// employee routes
const express = require('express');
const employeeRoutes = express.Router();

const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
  login,
  logout,
} = require('./employeeController');

const { requestTimeOff } = require('./employeeController');

// Login employee
employeeRoutes.post('/login', login);

// Logout employee
employeeRoutes.get('/logout', logout);

// Create a new agent
employeeRoutes.post('/', createEmployee);

// Get all employees
employeeRoutes.get('/', getAllEmployees);

// Get a single employee by ID
employeeRoutes.get('/:id', getEmployeeById);

// Update an existing employee by ID
employeeRoutes.put('/:id', updateEmployeeById);

// Delete an existing employee by ID
employeeRoutes.delete('/:id', deleteEmployeeById);
// Timeoff request
employeeRoutes.post('/:id/time-off', requestTimeOff);

module.exports = employeeRoutes;
