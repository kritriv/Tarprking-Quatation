require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/ProductModel");
const Vendor = require("./models/VendorModel");
const User = require("./models/UserModel");

const ProductJson = require("./Jsons/Products.json");
const VendorJson = require("./Jsons/Vendors.json");
const UserJson = require("./Jsons/Users.json");

const MONGODB_URL = 'mongodb+srv://TarParkingQuotation:vishhME22@tarparkingquotation.o04gm3m.mongodb.net/TarParkingQuotation?retryWrites=true&w=majority';

const start = async () => {
    try{
        await connectDB(MONGODB_URL);
        await Product.deleteMany();
        await Vendor.deleteMany();
        await User.deleteMany();

        await Product.create(ProductJson);
        console.log("Products Successfully Inserted");
        
        await Vendor.create(VendorJson);
        console.log("Vendors Successfully Inserted");
        
        await User.create(UserJson);
        console.log("Users Successfully Inserted");
    }
    catch(error){
        console.log(error);
    }
}

start();