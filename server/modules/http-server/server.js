require('dotenv').config();
const express = require('express');
const { expressLoggerMiddleware, logger } = require('../../utils/logger');
const { handleApiResponse } = require('../../modules/responseHandler');
const { enableCors, enableHelmet } = require('./middleware');
const AppRoutes = require('../../routers/appRoutes');
const AuthRoutes = require('../../routers/auth');

const API_Prefix = process.env.API_Prefix;

const configureServer = (server) => {
    enableCors(server);
    enableHelmet(server);

    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(expressLoggerMiddleware);

    server.use(`${API_Prefix}/app`, AppRoutes);
    server.use(`${API_Prefix}/auth`, AuthRoutes);

    // Error handling middleware
    server.use((err, req, res, next) => {
        logger.error(err.stack);

        if (res.headersSent) {
            return next(err);
        }
        handleApiResponse(res, 500, 'Internal Server Error');
    });
};

const HTTPServer = (HOST, PORT) => {
    const server = express();
    configureServer(server);

    return server.listen(PORT, HOST, () => {
        logger.info(`Server started at http://${HOST}:${PORT}`);
    });
};

module.exports = { HTTPServer };
