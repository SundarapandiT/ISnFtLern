const express = require('express');
const { createUser, fetchUserById, SaveUserRegisteration,SaveOtpVerify, verifyOtp } = require('../controllers/userController'); 

const router = express.Router();

router.post('/create', createUser);

router.get('/getUse/:id', fetchUserById);  
router.post('/UserRegisteration', SaveUserRegisteration); 
router.post('/EmailVerifyOtp', SaveOtpVerify);  
router.post('/verifyOtp', verifyOtp);

module.exports = router;
