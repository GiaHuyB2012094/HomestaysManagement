const mongoose = require('mongoose')
const { Schema } = mongoose;
const mongooseSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
    },
    cccd: {
        type: String,
    },
    phone: {
        type: Number,
    },
    avatar: {
        type: {},
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true})
const User = mongoose.model('users',mongooseSchema);
module.exports = User;