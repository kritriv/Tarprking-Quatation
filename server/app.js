const { logger } = require('./utils/logger');
const { mongoDBConnection } = require('./modules/database/connection');
const { HTTPServer } = require('./modules/http-server');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

const TarParkingQuotation = async () => {
    try {
        await mongoDBConnection();
        HTTPServer(HOST, PORT);
    } catch (e) {
        logger.error(e);
    }
};

TarParkingQuotation();
