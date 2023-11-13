const mongoose = require('mongoose')
const { Schema } = mongoose;
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
const Positionofemployee = mongoose.model('positionofemployees',mongooseSchema);
module.exports = Positionofemployee