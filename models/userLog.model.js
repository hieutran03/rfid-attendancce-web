const mongoose = require("mongoose");
const logSchema = new mongoose.Schema({
    uid : {
        type: String,
        ref: 'Employeer',
        required: true
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

// logSchema.pre("find", async function (next) {
//     this.populate("uid");
//     next();
// });
// logSchema.pre("find", async function(next){
//     this.populate("deviceID");
//     next();  
// })

const UserLog = mongoose.model('userlog', logSchema)
module.exports = UserLog