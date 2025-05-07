const { User } = require('../models/User');
const { getUserById } = require('../services/userService');
const { UserRegisteration } = require('../services/userService'); 
const { EmailVerifyOtp } = require('../services/userService'); 
const { VerifyOtp } = require('../services/userService');
const { UserLogin } = require('../services/userService');
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;



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
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user by ID' });
  }
};
const SaveUserRegisteration = async (req, res) => {
  try {
    const userdata = req.body;
    // console.log()
    console.log("USER = ",userdata)
    const user = await UserRegisteration(userdata);
    // console.log("uSER = ",user)
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user by ID' });
  }
};

const UserLoginAuthenticate = async (req, res) => {
  try {
    const userdata = req.body;
    const user = await UserLogin(userdata);
    console.log("user = ",user)
    var users = {LoginId:data.LoginID,
      UserType:data.SFLUsers,
    };
      var token = jwt.sign({ users }, JWT_SECRET, { expiresIn: '1h' });
      
    //  console.log("TokenTokenToken",token);
      token = Common.encodeDecode(token,"Encode");
    //  console.log("TokenTokenToken after",token);
      // Set the HttpOnly cookie
    res.cookie('LKA', token, {
      httpOnly: true,
      secure: true,  // Use HTTPS in production
      sameSite: 'None',
      maxAge: 3600000,  // 1 hour expiration
  
    });
    // console.log("uSER = ",user)
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Error in Login' });
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

const verifyOtp = async (req, res) => {
  try {
    const { email, otp_code } = req.body;  
    if (!email || !otp_code) {
      return res.status(400).send({ message: "Email and OTP code are required" });
    }
    const result = await VerifyOtp(email, otp_code);
    return res.status(200).send(result);
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).send({ message: "An error occurred while verifying OTP" });
  }
};

module.exports = { createUser, fetchUserById,SaveUserRegisteration,SaveOtpVerify,verifyOtp,UserLoginAuthenticate };
