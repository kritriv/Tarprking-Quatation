require("dotenv").config();
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');

const DataBaseClient = new MongoClient(process.env.MONGODB_URL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

async function connectDB() {
    try {
        await DataBaseClient.connect();
        await DataBaseClient.db("vishh").command({ ping: 1 });
        console.log(" You successfully connected to Database");
        return mongoose.connect(process.env.MONGODB_URL);
    }
    catch(e){
        console.log(e);
        console.dir;
    }
}
module.exports = connectDB;