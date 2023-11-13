const mongoose = require('mongoose')
const { Schema } = mongoose;
const mongooseSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
 
const  Convenient = mongoose.model('convenients', mongooseSchema);
module.exports = Convenient