const Room = require('../models/room');

const roomsController = {
    // Get all rooms
    getAllRooms: async(req,res) => {
        try {
            console.log('get all room')
            var sort = {branch : 1}
            const rooms = await Room.find({}).sort(sort);
            // console.log(rooms);
            return res.json(rooms);
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
    getRoomById: async(req,res) => {
        try {
            const roomid = req.params.id; 
            const room = await Room.findOne({_id : roomid})
            return res.json(room);
        } catch (error) {
            return res.status(400).json({message:error});
        } 
    },
    // add room
    createRoom: async(req,res) => {
        const {
            acreage,
            address,
            branch,
            convenient,
            desc,
            imgs,
            name,
            price,
            maxcount,
            nearbyTouristSpot,
            type,
        } = req.body;
        try {
            console.log("add room");
            const newroom = new Room({
                acreage,
                address,
                branch,
                convenient,
                desc,
                imgs,
                name,
                price,
                maxcount,
                nearbyTouristSpot,
                type,
            })
            var sort = {branch : 1}
            const rooms = await Room.find({}).sort(sort);
            // add number of room about branch
            let countBranch=0;
            rooms.forEach(room=>{
                if (branch===room.branch) {
                    countBranch++;
                }
            })
            Object.assign(newroom,{cleanStatus:true});
            Object.assign(newroom,{number: countBranch + 1});
            // ---------------------------------------------------
            const room = await newroom.save();
            // const rooms = await Room.find({}).sort(sort);
            return res.json(rooms);
        } catch (error) {
            return res.status(400).json({message:error});
        }
        
    },
    // delete room by id
    deleteRoom: async(req, res) => {
        console.log("delete room");
        // console.log(req.params.id)
        try {
            const roomdel = await Room.findByIdAndDelete(req.params.id);
            res.send("delete room successfully");
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
    // update room by id
    updateRoom: async(req,res) => {
        try {
            console.log("update room");
            const roomUpdate = await Room.findByIdAndUpdate(req.params.id,{
                name: req.body.name,
                acreage: req.body.acreage,
                address: req.body.address,
                branch: req.body.branch,
                convenient: req.body.convenient,
                desc: req.body.desc,
                imgs: req.body.imgs,
                maxcount: req.body.maxcount,
                nearbyTouristSpot: req.body.nearbyTouristSpot,
                price: req.body.price,
                type: req.body.type,
            })
            var sort = {branch : 1}
            const rooms = await Room.find({}).sort(sort);
            return res.json(rooms);
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
    // change clean status of a room
    changeCleanStatus: async(req,res) => {
        try {
            console.log('change clean status of a room');
            const roomUpdate = await Room.findByIdAndUpdate(req.params.id,
                {cleanStatus: req.body.cleanStatus,},
                {returnDocument: 'after'});
            return res.json(roomUpdate);
            
        } catch (error) {
            return res.status(400).json({message:error});
        }
    }
}

module.exports = roomsController;