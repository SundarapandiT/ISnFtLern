const { Sequelize } = require('sequelize');
const createSequelizeInstance = require('../config/dbConnection'); 
const SECRET_KEY = process.env.VITE_SECRET_KEY;
var moment = require("moment");
var nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const mg = require("nodemailer-mailgun-transport");
var CryptoJS = require("crypto-js");
// import CryptoJS from "crypto-js";


const getcountry = async (userId) => {
  try {
    const sequelize = await createSequelizeInstance();  
    console.log("here = ",userId);
    

    const result = await sequelize.query('SELECT * FROM spgetcountrydata()', {
      replacements: { userId }, 
      type: Sequelize.QueryTypes.RAW,  
    });

    return result;  
  } catch (error) {
    console.error('Error calling stored procedure:', error);
    throw error;
  }
};




const getStateListbycountry = async (userId) => {
    try {
      const sequelize = await createSequelizeInstance();  
      console.log("here = ",userId);
      const comparePass = `select * from spreturnstates(:p_countryID);`;
      const resultPass = await sequelize.query(comparePass, {
        replacements: { p_countryID: userId.CountryID},
        type: Sequelize.QueryTypes.RAW,
      });  
      return resultPass;  
    } catch (error) {
      console.error('Error calling stored procedure:', error);
      throw error;
    }
  };

const getpostadatabyCountry = async (userId) => {
    try {
      const sequelize = await createSequelizeInstance();  
      console.log("here = ",userId);
      const comparePass = `SELECT * FROM spgetpostaldatabycountry(:p_countryID,:p_postaCode);`;
      const resultPass = await sequelize.query(comparePass, {
        replacements: { p_countryID: userId.CountryID,p_postaCode: userId.PostalCode},
        type: Sequelize.QueryTypes.RAW,
      });  
      return resultPass;  
    } catch (error) {
      console.error('Error calling stored procedure:', error);
      throw error;
    }
  };
  

module.exports = { getcountry,getStateListbycountry,getpostadatabyCountry};
