const User = require('./userModel');

// Define allowed fields for update
const allowedUpdateFields = [
  'name',
  'email',
  'phone',
  'address',
  'city',
  'state',
  'empId',
  'socialSec',
  'hireDate',
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

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;

    const filter = role ? { role } : {};
    const users = await User.find(filter);

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUserById = async (req, res) => {
  try {
    const updateFields = req.body;

    // Validate fields
    if (!validateUpdateFields(updateFields)) {
      return res.status(400).json({ error: 'Invalid fields for update' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
