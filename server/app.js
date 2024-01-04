require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();

// const product_routes = require("./routes/products")


const connectDB = require("./db/connect");

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Welcome to Tar Parking Quotation Server");
})

// middleware or set the routes

// app.use('/api', ApiAuthenticate);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use("/api", product_routes);  // middleware routes for Products


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