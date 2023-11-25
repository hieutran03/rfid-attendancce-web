const mongoose = require("mongoose");
const logSchema = new mongoose.Schema({
    uid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employeer',
        required: true
    },
    timeIn : {
        type: Date,
        default : Date.now()
    }
});

logSchema.pre(/^find/, async function(next) {
    await this.populate('uid')
    next()
})

const Log = mongoose.model('Log', logSchema)
module.exports = Log