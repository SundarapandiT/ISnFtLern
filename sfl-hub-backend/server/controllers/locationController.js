const { User } = require('../models/User');
const { getcountry } = require('../services/locationService');
const { getStateListbycountry } = require('../services/locationService');
const { getpostadatabyCountry } = require('../services/locationService');


const getLocationCountry = async (req, res) => {
    try {
      
      const user = await getcountry();
    //   console.log("uSER = ",user)
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: 'Error in getting country' });
    }
  };

  const getStateList = async (req, res) => {
    try {
      const countryData = req.body;
      console.log("countryData = ",countryData)
      const user = await getStateListbycountry(countryData);
      console.log("uSER = ",user)
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: 'Error in getting state list' });
    }
  };

  const getPostalCodeData = async (req, res) => {
    try {
      const countryData = req.body;
      console.log("countryData = ",countryData)
      const user = await getpostadatabyCountry(countryData);
      console.log("uSER = ",user)
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: 'Error in getting state list' });
    }
  };



module.exports = { getLocationCountry,getStateList,getPostalCodeData };
