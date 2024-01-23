require('dotenv').config();
const mongoose = require('mongoose');
const { logger } = require('../../utils/logger');

const MongoDbString = process.env.MONGODB_URL;

const mongoDBConnection = async () => {
    try {
        const connection = await mongoose.connect(MongoDbString);
        logger.info('You successfully connected to the Database');
        return connection;
    } catch (error) {
        logger.error(`MongoDB connection error: ${error.message}`);
        throw error;
    }
};
module.exports = { mongoDBConnection };
