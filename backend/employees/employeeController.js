// employee controller
const Employee = require('./employeeModel');

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

// Function to validate update fields
const validateUpdateFields = (updateFields) => {
  return Object.keys(updateFields).every((field) =>
    allowedUpdateFields.includes(field)
  );
};

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
    const timeOffRequest = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    employee.timeOffRequests.push(timeOffRequest);
    const updatedEmployee = await employee.save();
    res.status(201).json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
  requestTimeOff,
  updateTimeOffRequest,
  deleteTimeOffRequest,
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
