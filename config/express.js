const express = require('express');
const expressValidation = require('express-validation');
const routes = require('../routes');

const app = express();

app.use('/api/', routes);

module.exports = app;