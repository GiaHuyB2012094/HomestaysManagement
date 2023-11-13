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
    type : {
        type: String,
        required: true,
    },
    nameEmployee: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        required: true,
    },
    note: {
        type: String,
    },
    isPayment: {
        type: Boolean,
    },
}, {
    timestamps: true,
});
 
const  Receipt = mongoose.model('receipts', mongooseSchema);
module.exports = Receipt