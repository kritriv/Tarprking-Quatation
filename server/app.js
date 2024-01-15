require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();

const product_routes = require("./routers/ProductRoutes");
const vendor_routes = require("./routers/VendorRoutes");
const authenticationRouter = require('./routers/authentication');
const adminRouter = require('./routers/AdminRoutes');
const userRouter = require('./routers/UserRoutes');
const superRouter = require('./routers//SuperAdminRoutes');
const connectDB = require("./db/connect");

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Welcome to Tar Parking Quotation Backend");
})

// middleware or set the routes 

// app.use('/api', ApiAuthenticate);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/v2/api", product_routes);  // middleware routes for Products
app.use("/v2/api", vendor_routes);  // middleware routes for Vendors

app.use('/v2/api',authenticationRouter);
app.use('/admin/',adminRouter);
app.use('/user/',userRouter);
app.use('/super/',superRouter);


const TarParkingQuotation = async () => {
    try{
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () =>{
            console.log(`Server is Listening on PORT: ${PORT}`);
        })
    }
    catch(e){
        console.log(e);
    }
}

TarParkingQuotation()