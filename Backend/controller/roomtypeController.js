const RoomType = require("../models/roomtype");
const Room =  require("../models/room");
const roomTypeController = {
    // create room type
    createRoomType : async(req,res) =>{
        const {name,codeRoomType,price,maxcount} = req.body;
        try {
            console.log("add room type")
            const newroomtype = new RoomType({codeRoomType,name,price,maxcount});
            
            const roomtype = await newroomtype.save();

            const roomtypes = await RoomType.find({});
            return res.json(roomtypes);
        } catch (error) {
            console.log(error);
        }
    },
    // get all room type
    getallRoomType : async(req,res) => {
        try {
            console.log("get all room type")
            const roomtypes = await RoomType.find({});
            const rooms = await Room.find({});
            // console.log(roomtypes);
            roomtypes.map((roomtypeval) => {
                var count = 0;
                rooms.forEach(roomval => {
                    if (roomval.type === roomtypeval.codeRoomType) {
                        count++;
                    }
                })
                roomtypeval.quantity = count;
            })
            return res.json(roomtypes);
        } catch (error) {
            console.log(error)
        }
       
    },
    // Get a roomtype
    getRoomtypeById : async(req,res) => {
        try {
            const roomtype = await RoomType.find({_id: req.params.id})
            res.send(roomtype)
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
     // delete room by id
    deleteRoomType: async(req, res) => {
        console.log("delete room type");
        try {
            const roomtypedel = await RoomType.findByIdAndDelete(req.params.id);
            res.send("delete room type successfully");
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
    // update room type by id
    updateRoomType: async(req,res) => {
        const {name,codeRoomType,price} = req.body;
        try {
            console.log("update room type");
            console.log(req.body)
            const roomtypeUpdate = await RoomType.findByIdAndUpdate(req.params.id,{name,codeRoomType,price})
            const roomtypes = await RoomType.find({});
            return res.json(roomtypes);
        } catch (error) {
            return res.status(400).json({message:error});
        }
    }

}
module.exports = roomTypeController;