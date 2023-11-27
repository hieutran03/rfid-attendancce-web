const mongoose = require("mongoose");
const deviceSchema = mongoose.Schema({
    _id:{
        type: String,
        unique: true,   
    },
    deviceName:{
        type: String,
    },
    deleted:{
        type: Boolean,
        default: false
    }
})

const Device = new mongoose.model("Device", deviceSchema);
module.exports = Device;