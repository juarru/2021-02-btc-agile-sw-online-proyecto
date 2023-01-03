const express = require("express");
const expressRequestId = require('express-request-id');
const { level } = require("winston");

const logger = require('./config/logger');

// Init App
const app = express();
const requestId = expressRequestId();

// Setup middleware
app.use(requestId);
app.use(logger.requests);

app.get('/', (req, res, next) => {
    res.json({
        message: "Wellcome to the API",
    });
});

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