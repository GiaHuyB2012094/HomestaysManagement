const mongoose = require('mongoose')
const { Schema } = mongoose;
const mongooseSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    desc : {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        required: true,
    },
    imgs: {
        type: [Schema.Types.Mixed],
        require: true,
    },
    quantity : {
        type: Number,
        required: true,
    },

}, {
    timestamps: true,
});
 
const  Service = mongoose.model('services', mongooseSchema);
module.exports = Service