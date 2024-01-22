const winston = require('winston');
const expressWinston = require('express-winston');
const { combine, timestamp, printf, colorize } = winston.format;

// Define log format
const logFormat = printf(({ level, message, timestamp }) => {
    const formattedTimestamp = new Date(timestamp).toLocaleTimeString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    return `${formattedTimestamp} ${level}: ${message}`;
});

// Create a logger
const logger = winston.createLogger({
    level: 'info',
    format: combine(colorize(), timestamp(), logFormat),
    transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), new winston.transports.File({ filename: 'logs/combined.log' })],
});

// Express middleware for logging requests and responses
const expressLoggerMiddleware = expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
});

module.exports = { logger, expressLoggerMiddleware };
