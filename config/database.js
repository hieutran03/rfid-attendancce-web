const mongoose = require('mongoose');
module.exports.connect = async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/employee-management');
        console.log("Database connection success!");
    } catch (error) {
        console.log("Database connection error: " + error);
    }    
}
