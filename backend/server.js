const express = require('express');
const dotenv = require('dotenv').config();

const connectDB = require('./config/db');

connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/trades', require('./routes/tradeRoutes'));

app.listen(port, () => console.log('Server started on port 5000'));
