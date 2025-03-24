const { Sequelize } = require('sequelize');
const createSequelizeInstance = require('../config/dbConnection'); 
const SECRET_KEY = process.env.VITE_SECRET_KEY;


const getUserById = async (userId) => {
  try {
    const sequelize = await createSequelizeInstance();  
    console.log("here = ",userId);
    

    const result = await sequelize.query('SELECT NOW()', {
      replacements: { userId }, 
      type: Sequelize.QueryTypes.RAW,  
    });

    return result;  
  } catch (error) {
    console.error('Error calling stored procedure:', error);
    throw error;
  }
};


const UserRegisteration = async (Userdata) => {
  try {
    const sequelize = await createSequelizeInstance();  
    if (Userdata) {
      console.log("here = ",Userdata);
      const result = await sequelize.query('SELECT NOW()', {
        replacements: { Userdata }, 
        type: Sequelize.QueryTypes.RAW,  
      });
  
      return result;
    }else{

      var message = "Something went wrong"
      return message

    }
      
  } catch (error) {
    console.error('Error calling stored procedure:', error);
    throw error;
  }
};
const EmailVerifyOtp = async (Userdata) => {
  try {
    const sequelize = await createSequelizeInstance();  
    if (Userdata) {
      let OTP = Math.floor(100000 + Math.random() * 900000);
      var otpquery = "CALL spInsertOTP('"+Userdata.email+"','"+OTP+"');"
      const result = await sequelize.query(otpquery, {
        replacements: { Userdata }, 
        type: Sequelize.QueryTypes.RAW,  
      });
  
      return result;
    }else{

      var message = "Something went wrong"
      return message

    }
      
  } catch (error) {
    console.error('Error calling stored procedure:', error);
    throw error;
  }
};

module.exports = { getUserById,UserRegisteration,EmailVerifyOtp };
