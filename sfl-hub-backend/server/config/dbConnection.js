const { Sequelize } = require('sequelize');
const { Connector } = require('@google-cloud/cloud-sql-connector');
const dotenv = require('dotenv');
dotenv.config();

const connector = new Connector();

const getIpType = () => {
  return process.env.DB_USE_PRIVATE_IP === "true" ? "PRIVATE" : "PUBLIC";
};

const createSequelizeInstance = async () => {
  try {
    const clientOpts = await connector.getOptions({
      instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME, 
      ipType: getIpType(),
    });

    const sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: clientOpts.socketPath,  
        dialect: 'postgres',
        logging: false,            
        dialectOptions: clientOpts,
      }
    );
    await sequelize.authenticate();
    console.log("PostgreSQL connection established successfully."); 
    return sequelize;  
  } catch (error) {
    console.error('Unable to connect to the PostgreSQL database:', error);
    throw error; 
  }
};

module.exports = createSequelizeInstance;
