const { Sequelize } = require('sequelize');
const createSequelizeInstance = require('../config/dbConnection'); 
const SECRET_KEY = process.env.VITE_SECRET_KEY;
var nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");
const auth = {
  auth: {
    api_key: process.env.MailGunapi_key,
    domain: process.env.MailGundomain,
  },
};

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
      // console.log("result:", result);
      const results = result[0];
      const otp_code = results[0]?.otp_code || '';
      const message = results[0]?.message || ''; 
      
      if (otp_code && message) {
        const transporter = nodemailer.createTransport(mg(auth));
        var text = 
		`<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				
				<title>SFL Worldwide</title>
				<style type="text/css">
					table ,tr , td { margin: 0; padding: 0;border: 1px solid; }
					body { font-size: 14px; font-family: 'Open Sans', sans-serif; color: #000; }
					table { width:400px; }
					span { margin: 0px 2px 0px 2px;font-weight: bold;}
				</style>
			</head>
			<body>
				<div>
		
					<p>Hello,</p>
					<p>Use OTP ${result[0]?.[0]?.otp_code} to verify your email to register in SFL Worldwide </p>
					
					<p>Thanks</p>
					<p>SFl Team</p>
					
				</div>
				
			</body>
		</html>
			`;
        var mailOptions = {
          
          from: "contact@sflworldwide.com",
          to: Userdata.email,
          cc: "anshul@sflworldwide.com",
          bcc: "",
          subject: "Email verification OTP",
          html: text,
          attachments: [],
          replyTo: "contact@sflworldwide.com",
        };
        transporter.sendMail(mailOptions, (sendMailerror, info) => {
          console.log(sendMailerror, info);
          if (sendMailerror) {
            console.log("email......err", sendMailerror);
            
          } else {
            console.log("email......res", info);
           
          }
        });
        return {
          message: message || "OTP sent successfully",
          otp_code: otp_code
        };
      } else if (message === 'Email is already verified, no need to generate OTP.') {
        return {
          message: message,
          otp_code: '' 
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
