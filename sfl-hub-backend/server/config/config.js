const dotenv = require("dotenv");
dotenv.config();

const dataBaseconfig = {};

if (process.env.NODE_ENV === "production") {
  dataBaseconfig.DB_instanceConnectionName = process.env.INSTANCE_CONNECTION_NAME;
  dataBaseconfig.DB_user = process.env.DB_USER;
  dataBaseconfig.DB_password = process.env.DB_PASSWORD;
  dataBaseconfig.DB_database_Name = process.env.DB_NAME;
  dataBaseconfig.DB_host = process.env.DB_HOST; 
} else if (process.env.NODE_ENV === "dev") {
  dataBaseconfig.DB_instanceConnectionName = process.env.DB_DEV_INSTANCE_CONNECTION_NAME;
  dataBaseconfig.DB_user = process.env.DB_DEV_USER;
  dataBaseconfig.DB_password = process.env.DB_DEV_PASSWORD;
  dataBaseconfig.DB_database_Name = process.env.DB_DEV_NAME;
  dataBaseconfig.DB_host = process.env.DB_DEV_HOST;
} else if (process.env.NODE_ENV === "stage") {
  dataBaseconfig.DB_instanceConnectionName = process.env.DB_STAGE_INSTANCE_CONNECTION_NAME;
  dataBaseconfig.DB_user = process.env.DB_STAGE_USER;
  dataBaseconfig.DB_password = process.env.DB_STAGE_PASSWORD;
  dataBaseconfig.DB_database_Name = process.env.DB_STAGE_NAME;
  dataBaseconfig.DB_host = process.env.DB_STAGE_HOST;
}

module.exports = { dataBaseconfig };
