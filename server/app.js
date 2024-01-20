require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const logger = require('./utils/logger');

const mongoDBConnection = require('./modules/database/connection');

const user_routes = require('./routers/UserRoutes');
const product_routes = require('./routers/ProductRoutes');
const product_category_routes = require('./routers/ProductCategoryRoutes');
const vendor_routes = require('./routers/VendorRoutes');
const quote_routes = require('./routers/QuotationRoute');
const authenticationRouter = require('./routers/authentication');
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

app.use('/v1/api', authenticationRouter);
app.use('/admin/', adminRouter);
app.use('/user/', userRouter);
app.use('/super/', superRouter);

app.use('/v1/api', user_routes); // middleware routes for Users
app.use('/v1/api', product_routes); // middleware routes for Products
app.use('/v1/api', vendor_routes); // middleware routes for Vendors
app.use('/v1/api', product_category_routes); // middleware routes for Vendors
app.use('/v1/api', quote_routes); // middleware routes for Vendors

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
