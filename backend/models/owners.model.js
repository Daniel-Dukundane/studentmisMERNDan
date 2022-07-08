const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const ownerSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    nationalID : {
        type : String,
        required : true,
        unique: true
    },
    phoneNumber : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    }
})
const Owner = mongoose.model("Owner",  ownerSchema);

module.exports = Owner;