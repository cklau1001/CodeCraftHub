// src/config/serverConfig.js
const dotenv = require('dotenv');
dotenv.config();

const serverConfig = {
    PORT: process.env.PORT || 5000,
};

module.exports = serverConfig;
