const express = require("express");

const app = express();
const dbConfig = require('../db')
// const port = process.env.PORT || 5000;
const port =  5000;


// upload file

// -------------

// router
const roomsRoute = require('../routes/roomsRoute');
const usersRoute = require('../routes/userRoute');
const bookingRoute = require('../routes/bookingRoute');
const convenientRoute = require('../routes/convenientRoute');
const nearbytouristspotRoute = require('../routes/nearbytouristspotRoute');
const branchRoute = require('../routes/branchRoute');
const employeeRoute = require('../routes/employeeRoute');
const roomtypeRoute = require('../routes/roomtypeRoute');
const positionofemployeeRoute = require('../routes/positionofemployeeRoute');
const receiptRoute = require('../routes/receiptRoute');
// --------------------------------

// create Data 
const createMongoose = require('../data/index');
    // createMongoose.createDataRoom();
// --------------------------------
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// router running
app.use("/api/rooms",roomsRoute);
app.use("/api/users",usersRoute);
app.use("/api/booking",bookingRoute);
app.use("/api/convenient",convenientRoute);
app.use("/api/branch",branchRoute);
app.use("/api/nearbytouristspot",nearbytouristspotRoute);
app.use("/api/employees",employeeRoute);
app.use("/api/roomtype",roomtypeRoute);
app.use("/api/positionofemployee",positionofemployeeRoute);
app.use("/api/receipt",receiptRoute);
// ---------------------------------
// server running
app.listen(port, () => console.log('Node server started'));