const mongoose = require('mongoose');

//Loading .env variables
require('dotenv').config();

//Function to connect with Mongodb atlas
const connectToMongodb = async ()=>{
    const db = await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log("Connected with Mongodb Successfully");
    return db;
}

module.exports = connectToMongodb;
