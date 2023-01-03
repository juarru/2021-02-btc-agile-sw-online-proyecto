const express = require("express");
const expressRequestId = require('express-request-id');
const { level } = require("winston");

const logger = require('./config/logger');
const api = require('./api/v1');

// Init App
const app = express();
const requestId = expressRequestId();

// Setup middleware
app.use(requestId);
app.use(logger.requests);

// Setup router and routes
app.use('/api', api);
app.use('api/v1', api);

// No route found handler
app.use((req, res, next) => {
    next({
        message: 'Route not found',
        statusCode: 404,
        level: 'warn',
    });
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message } = err;
    const log = `${logger.header(req)} ${statusCode} ${message}`;

    logger[level](log);

    res.status = statusCode;
    res.json({
        message,
    });
})

module.exports = app;