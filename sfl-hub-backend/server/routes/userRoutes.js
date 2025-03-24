const express = require('express');
const { createUser, fetchUserById, SaveUserRegisteration,SaveOtpVerify } = require('../controllers/userController'); 

const router = express.Router();

router.post('/create', createUser);

router.get('/getUse/:id', fetchUserById);  
router.post('/UserRegisteration', SaveUserRegisteration); 
router.post('/EmailVerifyOtp', SaveOtpVerify);  

module.exports = router;
