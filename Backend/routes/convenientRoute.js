const express = require("express");
const router = express.Router();

const convenientController = require('../controller/convenientController');
// routers
router.get("/getallconvenients",convenientController.getAllConvenient);
router.post("/createconvenient",convenientController.createConvenient);
router.delete("/deleteconvenientbyid/:id",convenientController.deleteConvenient);
router.put("/updateconvenientbyid/:id",convenientController.updateConvenient);
module.exports = router;