const Convenient = require("../models/convenient");

const convenientController = {
    // Get all convenients
    getAllConvenient: async(req,res) => {
        try {
            console.log('get all convenients')
            const convenients = await Convenient.find({})
            return res.json(convenients);
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
    // create convenient
    createConvenient: async(req,res) => {
        const newconvenient  = new Convenient({name: req.body.name});
        
        try {
            const convenientTemp = await Convenient.findOne({name: req.body.name});
            if (!convenientTemp) {
                const convenient = await newconvenient.save();
                return res.json(convenient);
            }
            return res.json("");
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
    // delete convenient by id
    deleteConvenient: async(req, res) => {
        console.log("delete convenient");
        // console.log(req.params.id)
        try {
            const convenientdel = await Convenient.findByIdAndDelete(req.params.id);
            res.send("delete convenient successfully");
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
    // update convenient by id
    updateConvenient: async(req,res) => {
        try {
            console.log("update convenient");
            const convenientUpdate = await Convenient.findByIdAndUpdate(req.params.id,{name: req.body.name})
            const result = await Convenient.find({})
            return res.json(result);
        } catch (error) {
            return res.status(400).json({message:error});
        }
    }
}
module.exports = convenientController;