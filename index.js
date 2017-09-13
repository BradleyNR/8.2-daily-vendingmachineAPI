const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const sequelize = require('sequelize');

const app = express();

app.use(bodyParser.json());

router(app);

app.listen(3000);

module.exports = app;
