const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const studentSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    classname : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    }
})
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;