const express = require ('express')
const router = express.Router();

const PositionofemployeeController = require('../controller/positionofemployeeController');
router.post("/createpositionofemployee",PositionofemployeeController.createPositionOfEmployee);
router.get("/getallpositionofemployee",PositionofemployeeController.getallPosition);
router.delete("/deletepositionofemployeebyid/:id",PositionofemployeeController.deletePosition);
router.put("/updatepositionofemployee/:id",PositionofemployeeController.updatePosition);
module.exports = router;