const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import dotenv
require('dotenv').config();
const p = process.env;

// connect to the database
mongoose
    .connect(p.MONGO_DB_URL)
    .then(() => console.log('Connect to MongoDB successful !'))
    .catch((error) => console.log('Connect to MongoDB failed !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    next();
});

app.use(bodyParser.json());

// import routes
const cityRoutes = require('./routes/city');

app.use('/city', cityRoutes);

module.exports = app;
