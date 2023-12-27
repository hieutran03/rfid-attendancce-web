const mongoose = require("mongoose");
const waitingListSchema = new mongoose.Schema({
    uid : {
        type: String,
    },
    deviceID:{
        type: String,
        ref: "Device",
        required: true
    },
    timeIn : {
        type: Date,
        default : Date.now()
    }},
   
);


const waitingList = mongoose.model('waitingList', waitingListSchema);
module.exports = waitingList