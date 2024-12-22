// admin routes
const express = require('express');
const Admin = require('./adminModel');
const adminRoutes = express.Router();

const {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
  getPendingRequests,
  updateRequestStatus,
  login,
  logout,
} = require('./adminController');

// Login user
adminRoutes.post('/login', login);

// Logout user
adminRoutes.get('/logout', logout);
// Create a new admin
adminRoutes.post('/', createAdmin);

// Get all admin
adminRoutes.get('/', getAllAdmins);

// Get a single admin by ID
adminRoutes.get('/:id', getAdminById);

// Update an existing admin by ID
adminRoutes.put('/:id', updateAdminById);

// Delete an existing admin by ID
adminRoutes.delete('/:id', deleteAdminById);

// Time-off request routes
adminRoutes.get('/admin/timeoff/pending', getPendingRequests);
adminRoutes.put('/admin/timeoff/:adminId/:requestId', updateRequestStatus);

module.exports = adminRoutes;
