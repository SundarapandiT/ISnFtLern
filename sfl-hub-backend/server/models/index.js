const createSequelizeInstance = require('../config/dbConnection');
const UserModel = require('./User');

const db = {};

const initDB = async () => {
    if (db.sequelize) {
        console.log("Database already initialized.");
        return db;
    }
    try {
        const sequelize = await createSequelizeInstance();

        db.sequelize = sequelize;
        db.Sequelize = require('sequelize').Sequelize;
        db.User = UserModel(sequelize);
        console.log("All models initialized successfully.");

        return db;
    } catch (error) {
        console.error("Failed to initialize database and models:", error);
        throw error;
    }
};

module.exports = { initDB, db };