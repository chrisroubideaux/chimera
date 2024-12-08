const User = require('./userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Password validation function
const isPasswordValid = (password) => {
  const regex = /^(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~]).{10,}$/;
  return regex.test(password);
};
// Function to validate update fields
const validateUpdateFields = (updateFields) => {
  return Object.keys(updateFields).every((field) =>
    allowedUpdateFields.includes(field)
  );
};
{
  /*
const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
*/
}
//

const createUser = async (req, res) => {
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
  } = req.body;

  try {
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    if (googleId || facebookId) {
      const newUser = new User({
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
      });

      await newUser.save();

      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return res.status(201).json({
        message: 'User created successfully via OAuth.',
        user: newUser,
        token,
        redirectTo: `http://localhost:3000/profile/${newUser._id}`,
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

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      photo,
      phone,
      address,
      city,
      state,
    });

    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({
      message: 'User created successfully.',
      user: newUser,
      token,
      redirectTo: `http://localhost:3000/users/${newUser._id}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Fetch all users
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
// Fetch user id
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

// Update an existing user by ID
const updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user by id
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

// Login an existing user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    const redirectTo = `http://localhost:3000/user/${user._id}`;
    console.log('Generated Token:', token);

    res
      .status(200)
      .json({ message: 'Login successful', user, token, redirectTo });
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
      redirectTo: 'http://localhost:3000/login',
    });
  } catch (error) {
    console.error('Error during logout:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error during logout.' });
  }
};
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  login,
  logout,
};
