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

{
  /*
const express = require('express');
const employeeRoutes = express.Router();

const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
} = require('./employeeController');

// CREATE a new employee
employeeRoutes.post('/', createEmployee, async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all employees
employeeRoutes.get('/', getAllEmployees, async (req, res) => {
  try {
    const employees = await employees.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single employee by ID
employeeRoutes.get('/:id', getEmployeeById, async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching employee by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// UPDATE an existing employee by ID
employeeRoutes.put('/:id', updateEmployeeById, async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    return res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE an existing employee by ID
employeeRoutes.delete('/:id', deleteEmployeeById, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndRemove(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    return res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = employeeRoutes;
*/
}
