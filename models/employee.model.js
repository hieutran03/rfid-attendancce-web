const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    _id: {
        type: String,
        unique: true
    },
    name : {
        type: String,
        required: true,
    },
    gender : {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    department: {
        type: String,
    },
    deleted: {
        type: Boolean,
        default: false,
    }}
);

const Employeer = mongoose.model('Employeer', employeeSchema)

module.exports = Employeer
