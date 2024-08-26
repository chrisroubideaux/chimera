//  admin
const Admin = require('./adminModel');
const mongoose = require('mongoose');

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
    const admins = await Admin.find(); // Ensure `Admin` is being used
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if `id` is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid admin ID' });
    }

    // Convert the string `id` to a MongoDB ObjectId
    const objectId = new mongoose.Types.ObjectId(id); // Add `new` here

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
    const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedAdmin) {
      res.status(404).json({ message: 'Admin not found' });
      return;
    }

    res.status(200).json(updatedAdmin);
  } catch (error) {
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
    res.status(200).json(pendingRequests);
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
