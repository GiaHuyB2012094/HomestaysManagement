const express = require("express");
const router = express.Router();

const branchController = require('../controller/branchController');
// routers
router.get('/getallbranchs',branchController.getAllBranch);
router.post('/addbranch',branchController.createBranch);
router.delete('/deletebranchbyid/:id',branchController.deleteBranch);
router.put('/updatebranchbyid/:id',branchController.updateBranch);
module.exports = router;