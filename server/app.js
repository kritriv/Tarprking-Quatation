require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const logger = require('./utils/logger');

const mongoDBConnection = require('./modules/database/connection');

const all_routes = require('./routers');

const adminRouter = require('./routers/AdminRoutes');
const userRouter = require('./routers/UserRoutes');
const superRouter = require('./routers//SuperAdminRoutes');

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Welcome to Tar Parking Quotation Backend');
});

// middleware or set the routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.use('/admin/', adminRouter);
app.use('/user/', userRouter);
app.use('/super/', superRouter);

app.use('/api/v1', all_routes);

const TarParkingQuotation = async () => {
    try {
        await mongoDBConnection(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

TarParkingQuotation();
