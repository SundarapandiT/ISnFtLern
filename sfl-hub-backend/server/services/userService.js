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

// For Email generate OTP to Store in db
const EmailVerifyOtp = async (Userdata) => {
  try {
    const sequelize = await createSequelizeInstance();  
    if (Userdata) {
      const otpQuery = `CALL spInsertOTP(:email, :otp_code, :message);`;
      const result = await sequelize.query(otpQuery, {
        replacements: { email: Userdata.email, otp_code: null, message: null },
        type: Sequelize.QueryTypes.RAW,
        plain: true
      });
      const otp_code = result[0]?.[0]?.otp_code; 
      const message = result[0]?.[0]?.message;  
      if (otp_code && message) {
        return {
          message: message || "OTP sent successfully",
          otp_code: otp_code
        };
      } else {
        console.error("Error: OTP or message is missing.");
        return { message: "Something went wrong, OTP could not be generated" };
      }
    } else {
      return { message: "User data is missing" };
    }
  } catch (error) {
    console.error('Error generating OTP:', error);
    throw error;
  }
};

// For Verify OTP and change status to Verified or Expired 
const VerifyOtp = async (email, otp_code) => {
  try {
    const sequelize = await createSequelizeInstance(); 
    const query = `CALL spVerifyOtp(:email_input, :otp_code_input, :status_message, :status_code);`;
    const result = await sequelize.query(query, {
      replacements: {
        email_input: email,
        otp_code_input: otp_code,
        status_message: null, 
        status_code: null
      },
      type: sequelize.QueryTypes.RAW,
      plain: true
    });
    const results = result[0];
    // console.log(results)
    const message = results[0]?.status_message;  
    const status = results[0]?.status_code;   
    return { "message": message, "status": status};
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

module.exports = { getUserById,UserRegisteration,EmailVerifyOtp,VerifyOtp};
