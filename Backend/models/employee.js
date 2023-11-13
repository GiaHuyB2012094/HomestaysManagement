const mongoose = require('mongoose')
const { Schema } = mongoose;
const mongooseSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    address : {
        type: String,
        required: true,
    },
    note : {
        type: String,
    },
    dateofbirth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    phone : {
        type: Number,
        required: true,
    },
    cmnd : {
        type: Number,
        required: true,
    },
    branch : {
        type: String,
        required: true,
    },
    position: {
        type: [Schema.Types.Mixed],
        require: true,
    },
}, {
    timestamps: true,
}); 
const Employee = mongoose.model('employees',mongooseSchema);
module.exports = Employee