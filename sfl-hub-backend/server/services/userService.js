const { Sequelize } = require('sequelize');
const createSequelizeInstance = require('../config/dbConnection'); 
const SECRET_KEY = process.env.VITE_SECRET_KEY;
var moment = require("moment");
var nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const mg = require("nodemailer-mailgun-transport");
var CryptoJS = require("crypto-js");
// import CryptoJS from "crypto-js";
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

const UserLogin = async (Userdata) => {
  try {
    const sequelize = await createSequelizeInstance();

    if (Userdata) {
      const Password = CryptoJS.AES.decrypt(Userdata.Password, SECRET_KEY).toString(CryptoJS.enc.Utf8);
      console.log("Pass = ", Password);
      const UserName = CryptoJS.AES.decrypt(Userdata.UserName, SECRET_KEY).toString(CryptoJS.enc.Utf8);

      const comparePass = `CALL spgetpassword(:p_loginid, :p_password);`;
      const resultPass = await sequelize.query(comparePass, {
        replacements: { p_loginid: UserName, p_password: null },
        type: Sequelize.QueryTypes.RAW,
      });

      const resultsP = resultPass[0];
      const p_password = resultsP[0]?.p_password || '';

      // Use async/await for bcrypt comparison
      const isMatch = await bcrypt.compare(Password, p_password);

      if (isMatch) {
        const Loginquery = `CALL spgetuserdetails(:p_loginid,:p_name,:p_email,:p_phonenum,:p_username);`;
        const result = await sequelize.query(Loginquery, {
          replacements: { p_loginid: UserName, p_name: null, p_email: null, p_phonenum: null, p_username: null },
          type: Sequelize.QueryTypes.RAW,
        });

        const results = result[0];
        const p_name = results[0]?.p_name || '';

        if (p_name) {
          var data = {
            p_name: CryptoJS.AES.encrypt(p_name, SECRET_KEY).toString(),
            p_email: CryptoJS.AES.encrypt(results[0].p_email, SECRET_KEY).toString(),
            p_phonenum: CryptoJS.AES.encrypt(results[0].p_phonenum, SECRET_KEY).toString(),
            p_username: CryptoJS.AES.encrypt(results[0].p_username, SECRET_KEY).toString(),
            Messages: "Login Successfully"
          };
          return { data: data };
        } else {
          console.error("Error: Person details not found.");
          return { message: "Something went wrong, User not found" };
        }
      } else {
        return { message: "Username or Password does not match." };
      }
    } else {
      return { message: "User data missing" };
    }
  } catch (error) {
    console.error('Error during user login:', error);
    return { message: "Something went wrong, please try again." };
  }
};

const UserRegisteration = async (Userdata) => {
  try {
    const sequelize = await createSequelizeInstance();
    
    if (Userdata) {
      console.log("res = ",Userdata);
      const salt = await bcrypt.genSalt(10); // Use async/await for bcrypt salt generation
      const Password = CryptoJS.AES.decrypt(Userdata.Password, SECRET_KEY).toString(CryptoJS.enc.Utf8);
      console.log("Pass = ",Password);
      
      const newPass = await bcrypt.hash(Password, salt); // Hash the password using async/await
      console.log("newPass = ",newPass)

      const Name = CryptoJS.AES.decrypt(Userdata.Name, SECRET_KEY).toString(CryptoJS.enc.Utf8);
      const UserName = CryptoJS.AES.decrypt(Userdata.UserName, SECRET_KEY).toString(CryptoJS.enc.Utf8);
      const Phone = CryptoJS.AES.decrypt(Userdata.Phone, SECRET_KEY).toString(CryptoJS.enc.Utf8);
      const Email = CryptoJS.AES.decrypt(Userdata.Email, SECRET_KEY).toString(CryptoJS.enc.Utf8);

      var datajson = {
        Name: Name,
        UserName:UserName,
        Phone:Phone,
        Email:Email,
        Password: newPass
      }

      // Insert into the Person table
      const Personquery = `CALL spregisteruser(:data,:personid,:getmessage);`;
      const result = await sequelize.query(Personquery, {
        replacements: { data: JSON.stringify(datajson),personid:null,getmessage:null},
        type: Sequelize.QueryTypes.RAW,
      });

      const results = result[0];
      const personID_receive = results[0]?.personid || '';
      console.log("res = ",results);
      

      if (personID_receive) {
        console.log("User Registration Success");
        return { message: "User Registration Successfully" }; // Return success message
      }else{
        return { message: results[0].result };
      }
    } else {
      return { message: "User Registration data missing" };
    }
  } catch (error) {

    return { message: "Something went wrong, please try again." };
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

module.exports = { getUserById,UserRegisteration,EmailVerifyOtp,VerifyOtp,UserLogin};
