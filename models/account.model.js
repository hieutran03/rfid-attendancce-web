const mongoose = require("mongoose");
const generate = require("../helpers/generate");

const accountSchema = mongoose.Schema({
    fullName:{
        type: String,
    },
    email:{
        type: String,
    },
    password:{
        type: String,
    },
    token: {
        type: String,
        default: generate.generateRandomString(20),
    },
    phone: {
        type: String
    },
    deleted:{
        type: Boolean,
        default: false
    }
});

const Account = mongoose.model("Account", accountSchema, "accounts");

module.exports = Account;