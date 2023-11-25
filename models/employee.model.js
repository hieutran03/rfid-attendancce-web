const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    }
});
const Employeer = mongoose.model('Employeer', employeeSchema)

module.exports = Employeer
