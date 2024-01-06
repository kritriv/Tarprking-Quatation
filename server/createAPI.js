require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/ProductModel");
const ProductJson = require("./Jsons/Products.json");

// const MONGODB_URL = 'mongodb+srv://TarParkingQuotation:vishhME22@tarparkingquotation.o04gm3m.mongodb.net/TarParkingQuotation?retryWrites=true&w=majority';

const start = async () => {
    try{
        await connectDB(process.env.MONGODB_URL);
        await Product.deleteMany();

        await Product.create(ProductJson);
        console.log("Products Successfully Inserted");
    }
    catch(error){
        console.log(error);
    }
}

start();