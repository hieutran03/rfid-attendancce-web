const mongoose = require("mongoose");
const generate = require("../helpers/generate");
const accountSchema = mongoose.Model({
    fullname:{
        type: String,
        default: Adminstrator
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    token: {
        type: String,
        default: generate.generateRandomString(20),
        require: true
    },
});
const Account = mongoose.model("Account",accountSchema);
module.exports = Account;