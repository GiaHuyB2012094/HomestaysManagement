const mongoose = require('mongoose')
const { Schema } = mongoose;
const mongooseSchema = new Schema({
    codeRoomType: {
        type: String,
        required: true,
    },
    name : {
        type: String,
        required: true,
    },
    price : {
        type: [],
        required: true,
    },
    quantity: {
        type: Number,
    },
    maxcount: {
        type: String,
        required: true,
    }
})
const RoomType = mongoose.model("roomtypes",mongooseSchema);
module.exports = RoomType