require('dotenv').config();
const { mongoDBConnection } = require('../modules/database/connection');
const { logger } = require('../utils/logger');

const AdminJson = require('./json/admin.json');
const CompanyJson = require('./json/company.json');

const MongoDbString = process.env.MONGODB_URL;

const TarSetUp = async () => {
    try {
        await mongoDBConnection(MongoDbString);

        const { User, Company } = require('../models');

        // await User.deleteMany();
        // await Company.deleteMany();

        await User.create(AdminJson);
        logger.info('👍 Admins created : Done!');

        await Company.create(CompanyJson);
        logger.info('👍 Company Details created : Done!');
    } catch (error) {
        console.log(error);
    }
};

TarSetUp();
