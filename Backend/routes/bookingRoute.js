const express = require("express");
const router = express.Router();

const bookingController = require("../controller/bookingController")
// routers
router.post('/bookroom',bookingController.bookingRoom);
router.get('/getbookingsbyuserid/:userid',bookingController.getBookingsUserId)
router.get('/getallbooking/',bookingController.getAllBooking)
router.get('/getbookingbyid/:id',bookingController.getBookingById)
router.post('/cancelbooking',bookingController.cancelBooking)
router.delete('/deletebookingbyid/:id',bookingController.deleteBooking);
router.post('/checkoutBooking',bookingController.checkoutBooking);
module.exports = router;