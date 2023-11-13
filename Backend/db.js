const mongoose = require('mongoose');

var mongooURL = "mongodb+srv://huydevse040902:0336070648@myblog.1p508pu.mongodb.net/mern-homestayeManagement";

try {
    mongoose.connect(mongooURL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
} catch (err) {
    console.log("Error after initial connection : ",err);
}

mongoose.connection.on('error', () => console.log("Mongoodb connection falied"));
mongoose.connection.on('connected', () => console.log("Mongoodb connection successful"));

module.exports = mongoose;