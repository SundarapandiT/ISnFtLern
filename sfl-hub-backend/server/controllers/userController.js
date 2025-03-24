const { User } = require('../models/User');
const { getUserById } = require('../services/userService');
const { UserRegisteration } = require('../services/userService'); 
const { EmailVerifyOtp } = require('../services/userService'); 

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const fetchUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);
    console.log("uSER = ",user)
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user by ID' });
  }
};
const SaveUserRegisteration = async (req, res) => {
  try {
    const userdata = req.body;
    const user = await UserRegisteration(userdata);
    // console.log("uSER = ",user)
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user by ID' });
  }
};
const SaveOtpVerify = async (req, res) => {
  try {
    const userdata = req.body;
    const user = await EmailVerifyOtp(userdata);
    // console.log("uSER = ",user)
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user by ID' });
  }
};

module.exports = { createUser, fetchUserById,SaveUserRegisteration,SaveOtpVerify };
