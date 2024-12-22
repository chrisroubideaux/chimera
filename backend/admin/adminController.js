// admin controller
const Admin = require('./adminModel');
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
  'hireDate',
  'endDate',
  'wage',
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

const createAdmin = async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid admin ID' });
    }

    const objectId = new mongoose.Types.ObjectId(id);

    const admin = await Admin.findById(objectId);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json(admin);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to fetch admin', error: error.message });
  }
};

{
  /*
const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if `id` is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid admin ID' });
    }

    // Convert the string `id` to a MongoDB ObjectId
    const objectId = mongoose.Types.ObjectId(id);

    const admin = await Admin.findById(objectId);

    if (!admin) {
      res.status(404).json({ message: 'Admin not found' });
      return;
    }

    res.status(200).json(admin);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to fetch admin', error: error.message });
  }
};

*/
}
const updateAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Update Request Body:', req.body);

    const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    console.log('Updated Admin:', updatedAdmin);
    res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error('Update Error:', error);
    res
      .status(500)
      .json({ message: 'Failed to update admin', error: error.message });
  }
};

const deleteAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await Admin.findByIdAndDelete(id);

    if (!deletedAdmin) {
      res.status(404).json({ message: 'Admin not found' });
      return;
    }

    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to delete admin', error: error.message });
  }
};

// Get all pending time-off requests
const getPendingRequests = async (req, res) => {
  try {
    const admins = await Admin.find(
      { 'timeOffRequests.status': 'pending' },
      'name timeOffRequests'
    );
    const pendingRequests = admins.flatMap((admin) =>
      admin.timeOffRequests
        .filter((request) => request.status === 'pending')
        .map((request) => ({
          adminId: admin._id,
          adminName: admin.name,
          ...request.toObject(),
        }))
    );

    const employees = await Employee.find(
      { 'timeOffRequests.status': 'pending' },
      'name timeOffRequests'
    );
    const pendingEmployeeRequests = employees.flatMap((employee) =>
      employee.timeOffRequests
        .filter((request) => request.status === 'pending')
        .map((request) => ({
          employeeId: employee._id,
          employeeName: employee.name,
          ...request.toObject(),
        }))
    );

    const allPendingRequests = [...pendingRequests, ...pendingEmployeeRequests];

    res.status(200).json(allPendingRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update time-off request status
const updateRequestStatus = async (req, res) => {
  const { adminId, requestId } = req.params;
  const { status } = req.body;

  if (!['approved', 'denied'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const admin = await Admin.findOneAndUpdate(
      { _id: adminId, 'timeOffRequests._id': requestId },
      { $set: { 'timeOffRequests.$.status': status } },
      { new: true }
    );

    if (!admin) {
      return res
        .status(404)
        .json({ error: 'Admin or time-off request not found' });
    }

    const employee = await employee.findOneAndUpdate(
      { _id: admin.timeOffRequests.id, 'timeOffRequests._id': requestId },
      { $set: { 'timeOffRequests.$.status': status } },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({
        error: 'Employee or time-off request not found in Employee model',
      });
    }

    res.status(200).json({ message: 'Request status updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login an existing admin
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email }); // Changed from User to Admin

    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);
    const redirectTo = `https://chimera-green.vercel.app/admins/${admin._id}`;
    console.log('Generated Token:', token);

    res
      .status(200)
      .json({ message: 'Login successful', admin, token, redirectTo });
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
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
  updateRequestStatus,
  getPendingRequests,
  login,
  logout,
};
