const express = require('express');
const { createUser, fetchUserById } = require('../controllers/userController'); 

const router = express.Router();

router.post('/create', createUser);

router.get('/:id', fetchUserById);  

module.exports = router;
