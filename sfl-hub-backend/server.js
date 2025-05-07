require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { initDB } = require('./server/models/index');
const userRoutes = require('./server/routes/userRoutes');
const locationRoutes = require('./server/routes/locationRoutes');
// import cors from 'cors';
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Allow requests only from this origin
  methods: 'GET,POST,PUT,DELETE',  
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/locations', locationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await initDB();
  console.log(`Server is running on port ${PORT}`);
});
