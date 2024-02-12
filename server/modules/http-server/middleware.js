require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');

const allowedOrigin = process.env.ALLOWED_ORIGIN;

const enableCors = (server) => {
    server.use(
        cors({
            origin: [allowedOrigin],
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
            optionsSuccessStatus: 204,
            allowedHeaders: ['authorization', 'Authorization', 'content-type'],
        }),
    );
};

const configureHelmet = () => {
    return helmet({
        contentSecurityPolicy: false,
        featurePolicy: {
            features: {
                geolocation: ["'none'"],
            },
        },
    });
};

const enableHelmet = (server) => {
    server.use(configureHelmet());
};

module.exports = { enableCors, enableHelmet };
