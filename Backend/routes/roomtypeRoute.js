const express = require("express");
const router = express.Router();
const roomTypeController = require("../controller/roomtypeController");
// routers
router.post("/createroomtype",roomTypeController.createRoomType);
router.get("/getallroomtype",roomTypeController.getallRoomType);
router.get("/getroomtypebyid/:id",roomTypeController.getRoomtypeById);
router.delete("/deleteroomtypebyid/:id",roomTypeController.deleteRoomType);
router.put("/updateRoomType/:id",roomTypeController.updateRoomType);
module.exports = router;