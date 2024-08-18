//  admin
const Admin = require('./adminModel');

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
    const admins = await admins.find();
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAdminById = async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateAdminById = async (req, res) => {
  try {
    const updateFields = req.body;

    // Validate fields
    if (!validateUpdateFields(updateFields)) {
      return res.status(400).json({ error: 'Invalid fields for update' });
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );
    if (!updatedAdmin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.status(200).json(updatedAdmin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAdminById = async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndRemove(req.params.id);
    if (!deletedAdmin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    res.status(200).json(pendingRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update time-off request status
const updateRequestStatus = async (req, res) => {
  const { adminId, requestId } = req.params;
  const { status } = req.body; // Expected to be either 'approved' or 'denied'

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

    res.status(200).json({ message: 'Request status updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
};
