const { Sequelize } = require('sequelize');
const createSequelizeInstance = require('../config/dbConnection'); 


const getUserById = async (userId) => {
  try {
    const sequelize = await createSequelizeInstance();  

    const result = await sequelize.query('CALL getUserById(:userId)', {
      replacements: { userId }, 
      type: Sequelize.QueryTypes.RAW,  
    });

    return result;  
  } catch (error) {
    console.error('Error calling stored procedure:', error);
    throw error;
  }
};

module.exports = { getUserById };
