const Nearbytouristspot = require('../models/nearbytouristspot')
const nearbytouristspotController = {
    // Get all rooms
    getAllNearbytouristspots: async(req,res) => {
        try {
            console.log('get all nearbytouristspots')
            var sort = {branch : 1} // sort ascending
            const nearbytouristspots = await Nearbytouristspot.find({}).sort(sort);
            return res.json(nearbytouristspots);
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
    // create nearbytouristspot
    createNearbytouristsopt: async(req,res) => {
        const newnearbytouristsopt  = new Nearbytouristspot({
            name: req.body.name,
            distance: req.body.distance,
            branch: req.body.branch
        });
        try {
            const nearbytouristsoptTemp = await Nearbytouristspot.findOne({
                name: req.body.name,
                distance: req.body.distance,
                branch: req.body.branch
            });
            if (!nearbytouristsoptTemp) {
                const nearbytouristsopt = await newnearbytouristsopt.save();
                return res.json(nearbytouristsopt);
            }
            return res.json("");
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
     // delete nearbytouristspot by id
     deleteNearbyTouristspot: async(req, res) => {
        console.log("delete NearbyTouristspot");
        // console.log(req.params.id)
        try {
            const nearbyTouristspotDel = await Nearbytouristspot.findByIdAndDelete(req.params.id);
            res.send("delete NearbyTouristspot successfully");
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
    // update NearbyTouristSpot by id
    updateNearbyTouristSpot: async(req,res) => {
        try {
            console.log("update NearbyTouristSpot");
            const NearbyTouristSpotUpdate = await Nearbytouristspot.findByIdAndUpdate(req.params.id,{
                name: req.body.name,
                distance: req.body.distance,
                branch: req.body.branch,
                })
            const result = await Nearbytouristspot.find({});
            return res.json(result);
        } catch (error) {
            return res.status(400).json({message:error});
        }
    }
}
module.exports = nearbytouristspotController;