const express = require("express");
const router = express.Router();

const nearbytouristspotController = require('../controller/nearbytouristspotController')
// routers
router.get('/getallnearbytouristspots',nearbytouristspotController.getAllNearbytouristspots);
router.post('/createnearbytouristspots',nearbytouristspotController.createNearbytouristsopt);
router.delete('/deletenearbytouristspotbyid/:id',nearbytouristspotController.deleteNearbyTouristspot);
router.put('/updatenearbytouristspot/:id',nearbytouristspotController.updateNearbyTouristSpot);
module.exports = router;