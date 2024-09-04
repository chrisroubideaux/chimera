// employee routes
const express = require('express');
const employeeRoutes = express.Router();

const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
} = require('./employeeController');

// Create a new employee
employeeRoutes.post('/', createEmployee);

// Get all employees
employeeRoutes.get('/', getAllEmployees);

// Get a single employee by ID
employeeRoutes.get('/:id', getEmployeeById);

// Update an existing employee by ID
employeeRoutes.put('/:id', updateEmployeeById);

// Delete an existing employee by ID
employeeRoutes.delete('/:id', deleteEmployeeById);

module.exports = employeeRoutes;
