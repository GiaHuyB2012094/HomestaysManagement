const Employee = require('../models/employee');
const EmployeeController = {
    // create employee
    createEmployee : async(req,res) =>{
        const {name,address,branch,cmnd,dateofbirth,gender,note,position,phone} = req.body;
        try {
            console.log("add employee")
            const newemployee = new Employee({
                name,address,branch,cmnd,dateofbirth,gender,note,position,phone
            });
            const employees = await newemployee.save();
            const employee = await Employee.find({});
            return res.json(employee);
        } catch (error) {
            console.log(error);
        }
    },
    // get all employee
    getallEmployee : async(req,res) => {
        try {
            console.log("get all employee")
            const employee = await Employee.find({});
            return res.json(employee);
        } catch (error) {
            console.log(error)
        }
    },
    // // delete an employee
    deleteEmployee: async(req, res) => {
        console.log("delete employee");
        try {
            const employeedel = await Employee.findByIdAndDelete(req.params.id);
            res.send("delete employee");
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
    // // update an employee
    updateEmployee: async(req,res) => {
        const {name,address,branch,cmnd,dateofbirth,gender,note,position,phone} = req.body;
        try {
            console.log("update an employee");
            console.log(req.body)
            const employeeUpdate = await Employee.findByIdAndUpdate(req.params.id,
                {name,address,branch,cmnd,dateofbirth,gender,note,position,phone})
                
            const employee = await Employee.find({});
            return res.json(employee);
        } catch (error) {
            return res.status(400).json({message:error});
        }
    }

}
module.exports = EmployeeController