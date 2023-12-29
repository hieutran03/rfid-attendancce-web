const mongoose = require('mongoose');
module.exports.connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connection success!");
    } catch (error) {
        console.log("Database connection error: " + error);
    }    
}