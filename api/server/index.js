const express = require("express");
const morgan = require('morgan');

const logger = require('./config/logger');

const app = express();

app.use(morgan('combined', { stream: { write:(message) => logger.info(message) } }));

app.get('/', (req, res, next) => {
    res.json({
        message: "Wellcome to the API",
    });
});

// No route found handler
app.use((req, res, next) => {
    const message = 'Error. Route not found';
    const statusCode = 404;

    logger.warn(message);

    res.status(statusCode);
    res.json({
        message
    });
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message } = err;
    
    logger.error(message);

    res.status = statusCode;
    res.json({
        message,
    });
})

module.exports = app;