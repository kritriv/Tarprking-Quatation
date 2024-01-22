const winston = require('winston');
const expressWinston = require('express-winston');
const { createLogger, format, transports } = winston;
require('dotenv').config();

// Define log format, including IP address
const logFormat = format.printf(({ level, message, timestamp, req , ...info}) => {
    const formattedTimestamp = new Date(timestamp).toLocaleTimeString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    const fileName = 'combined.log';
    const logLevel = info.level ? info.level.toUpperCase() : process.env.logger_level_default.toUpperCase();

    return `${formattedTimestamp} | ${logLevel} [${fileName}] | ${level}: ${message} `;
});

const capitalizeLevel = format((info) => {
    info.level = info.level.toUpperCase();
    return info;
})();

// Transports to save the logs to
const errorLogs = new transports.File({ filename: 'logs/error.log', level: 'error' });
const combinedLogs = new transports.File({ filename: 'logs/combined.log' });

// Create a logger
const logger = createLogger({
    format: format.combine(capitalizeLevel, format.timestamp(), logFormat, format.colorize()),
    transports: [new transports.Console(), errorLogs, combinedLogs],
    exitOnError: false,
});

// Express middleware for logging requests and responses, passing req object
const expressLoggerMiddleware = expressWinston.logger({
    winstonInstance: logger,
    expressFormat: true,
    colorize: true,
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    req: true,
});

module.exports = { logger, expressLoggerMiddleware };
