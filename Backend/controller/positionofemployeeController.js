const Positionofemployee = require('../models/positionofemployee');
const PositionofemployeeController = {
    // create position of employee
    createPositionOfEmployee : async(req,res) =>{
        const {name,salary} = req.body;
        try {
            console.log("add position of employee")
            const newposition = new Positionofemployee({name,salary});
            
            const position = await newposition.save();

            const positions = await Positionofemployee.find({});
            return res.json(positions);
        } catch (error) {
            console.log(error);
        }
    },
    // get all position of employee
    getallPosition : async(req,res) => {
        try {
            console.log("get all position of employee")
            const positions = await Positionofemployee.find({});
            return res.json(positions);
        } catch (error) {
            console.log(error)
        }
    },
     // delete an position of employee
    deletePosition: async(req, res) => {
        console.log("delete position of employee");
        try {
            const positiondel = await Positionofemployee.findByIdAndDelete(req.params.id);
            res.send("delete position of employee");
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
    // update an position of employee
    updatePosition: async(req,res) => {
        const {name,salary} = req.body;
        try {
            console.log("update  an position of employee");
            console.log(req.body)
            const positionUpdate = await Positionofemployee.findByIdAndUpdate(req.params.id,{name,salary})
            const positions = await Positionofemployee.find({});
            return res.json(positions);
        } catch (error) {
            return res.status(400).json({message:error});
        }
    }

}
module.exports = PositionofemployeeController;