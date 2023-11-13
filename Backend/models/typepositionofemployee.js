const mongoose = require('mongoose');
const {Schema} = new mongoose;
const mongooseSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    salary : {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
}); 
const Typeofpositionofemployee= mongoose.model('typeofpositionofemployees',mongooseSchema);
module.exports =Typeofpositionofemployee