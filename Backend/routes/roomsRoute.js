const express = require('express')
const router = express.Router()

const roomsController = require('../controller/roomsController');
// routers
router.get("/getallrooms",roomsController.getAllRooms);
router.get("/getroombyid/:id",roomsController.getRoomById);
router.post("/addroom",roomsController.createRoom);
router.delete("/deleteroombyid/:id",roomsController.deleteRoom);
router.put("/updateroombyid/:id",roomsController.updateRoom);
router.put("/changecleanstatus/:id",roomsController.changeCleanStatus);
module.exports = router;