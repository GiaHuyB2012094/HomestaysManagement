const mongoose = require('mongoose')
const { Schema } = mongoose;
const mongooseSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    branch : {
        type: Number,
        required: true,
    },
    address : {
        type: String,
        required: true,
    },
    totalroom :  {
        type: Number,
    },
    totalorderedroom :  {
        type: Number,
    },
    totalemptyroom:  {
        type: Number,
    },
}, {
    timestamps: true,
});
 
const  Branch = mongoose.model('branchs', mongooseSchema);
module.exports = Branch