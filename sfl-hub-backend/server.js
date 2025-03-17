require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { initDB } = require('./server/models/index');
const userRoutes = require('./server/routes/userRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await initDB();
  console.log(`Server is running on port ${PORT}`);
});
