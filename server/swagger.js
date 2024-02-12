require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

const doc = {
    info: {
        title: 'Tar Parking CRM API',
        description: 'Tar parking quotation is use to create CRM for manufacturing unit',
    },
    host: `${HOST}:${PORT}`,
};

const outputFile = './swagger-output.json';
const routes = ['./routers/auth.js', './routers/appRoutes.js'];

swaggerAutogen(outputFile, routes, doc);
