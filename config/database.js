const mongoose = require('mongoose');
module.exports.connect = async()=>{
    try {
        await mongoose.connect('mongodb+srv://hieumdg:tgFsSuXERC7zjvxy@mymongodb.lwsbljs.mongodb.net/employee-management');
        console.log("Database connection success!");
    } catch (error) {
        console.log("Database connection error: " + error);
    }    
}
