const createSequelizeInstance = require('../config/dbConnection');
const User = require('./User');

const initDB = async () => {
  try {
    const sequelize = await createSequelizeInstance(); 
    console.log('Database connected successfully.');

    await sequelize.sync({ alter: true });
    console.log('Database synced.');

  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

module.exports = { initDB, User };