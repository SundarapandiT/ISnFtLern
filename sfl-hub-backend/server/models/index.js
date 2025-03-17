const sequelize = require('../config/dbConnection');
const User = require('./User');

const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    await sequelize.sync({ alter: true }); 
    console.log('Database synced.');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

module.exports = { sequelize, User, initDB };
