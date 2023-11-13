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
    number : {
        type: Number,
        required: true,
    },
    desc : {
        type: String,
        required: true,
    },
    cleanStatus : {
        type: Boolean,
        required: true,
    },
    acreage: {
        type: Number,
        required: true,
    },
    type : {
        type: String,
        required: true,
    },
    maxcount: {
        type: Number,
        require: true,
    },
    price: {
        type: [],
        require: true,
    },
    address : {
        type: String,
        required: true,
    },
    imgs: {
        type: [Schema.Types.Mixed],
        require: true,
    },
    currentBooking: [Schema.Types.Mixed],
    nearbyTouristSpot: {
        type: [Schema.Types.Mixed],
        require: true,
    },
    convenient: {
        type: [],
        require: true,
    }, 
}, {
    timestamps: true,
});
 
const  Room = mongoose.model('rooms', mongooseSchema);
module.exports = Room