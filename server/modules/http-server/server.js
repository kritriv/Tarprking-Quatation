require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');
const { expressLoggerMiddleware, logger } = require('../../utils/logger');
const AppRoutes = require('../../routers/appRoutes');
const AuthRoutes = require('../../routers/auth');

const HTTPServer = (PORT) => {
    // middleware or set the routes
    server.use(cors());
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(expressLoggerMiddleware);

    server.use('/api/v1', AppRoutes);
    server.use('/api/v1', AuthRoutes);

    return server.listen(PORT, () => {
        logger.info(`Server is running on PORT ${PORT}`);
    });
};

module.exports = { HTTPServer };
