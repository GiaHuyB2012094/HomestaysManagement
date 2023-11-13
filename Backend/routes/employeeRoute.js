const express = require ('express')
const router = express.Router();

const EmployeeController = require('../controller/employeeController')

router.post("/createemployee",EmployeeController.createEmployee);
router.get("/getallemployees",EmployeeController.getallEmployee);
router.delete("/deleteempoyeebyid/:id",EmployeeController.deleteEmployee);
router.put("/updateemployee/:id",EmployeeController.updateEmployee);
module.exports = router;