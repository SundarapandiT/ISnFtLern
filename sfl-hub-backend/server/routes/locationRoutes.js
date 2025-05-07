const express = require('express');
const { getLocationCountry} = require('../controllers/locationController'); 
const { getStateList} = require('../controllers/locationController'); 
const { getPostalCodeData} = require('../controllers/locationController'); 


const router = express.Router();

router.get('/getCountry', getLocationCountry);  
router.post('/getstate', getStateList); 
router.post('/getstateCitybyPostalCode', getPostalCodeData);  


module.exports = router;
