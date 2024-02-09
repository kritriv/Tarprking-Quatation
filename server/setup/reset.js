require('dotenv').config();
const { mongoDBConnection } = require('../modules/database/connection');
const { logger } = require('../utils/logger');

const MongoDbString = process.env.MONGODB_URL;

const TarReset = async () => {
    try {
        await mongoDBConnection(MongoDbString);

        const { User, Company, Client, ProductCategory, Product, SubProduct, Specification, TermAndCondition, Quote } = require('../models');

        await User.deleteMany();
        logger.info('👍 Users Deleted: Done!');

        await Company.deleteMany();
        logger.info('👍 Companies Deleted: Done!');

        await Client.deleteMany();
        logger.info('👍 Clients Deleted: Done!');

        await ProductCategory.deleteMany();
        logger.info('👍 Product Categories Deleted: Done!');

        await Product.deleteMany();
        logger.info('👍 Products Deleted: Done!');

        await SubProduct.deleteMany();
        logger.info('👍 SubProducts Deleted: Done!');

        await Specification.deleteMany();
        logger.info('👍 Specifications Deleted: Done!');

        await TermAndCondition.deleteMany();
        logger.info('👍 Terms and Conditions Deleted: Done!');

        await Quote.deleteMany();
        logger.info('👍 Quotes Deleted: Done!');
    } catch (error) {
        console.log(error);
    }
};

TarReset();
