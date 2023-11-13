const mongoose = require('mongoose')
const { Schema } = mongoose;
const mongooseSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    distance : {
        type: String,
        required: true,
    },
    branch : {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});
 
const  Nearbytouristspot = mongoose.model('nearbytouristspots', mongooseSchema);
module.exports = Nearbytouristspot