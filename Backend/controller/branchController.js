const Branch = require("../models/branch");
const Room = require("../models/room");
const branchController = {
    getAllBranch: async(req,res) => {
        try {
            console.log('get all branchs');
            const branchs = await Branch.find({});
            const roomTemp = await Room.find({});

            branchs.map((branchEl) => {
                var countTotalRoom = 0;
                var countTotalOrderedRoom = 0;
                roomTemp.forEach((roomEl) => {
                    if (branchEl.branch === roomEl.branch) {
                        countTotalRoom++;
                        if(roomEl.currentBooking){
                            countTotalOrderedRoom++;
                        }
                    }
                })
                branchEl.totalroom = countTotalRoom;
                branchEl.totalorderedroom = countTotalOrderedRoom;
                branchEl.totalemptyroom =  branchEl.totalroom - branchEl.totalorderedroom;
            })
            return res.json(branchs);

        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
    // create branch
    createBranch: async(req,res) => {
        const newbranch  = new Branch({name: req.body.name, branch: req.body.branch, address: req.body.address});
        
        try {
            console.log("create branch")
            const branchTemp = await Branch.findOne({branch: req.body.branch});
            if (!branchTemp) {
                const branch = await newbranch.save();
                branch.totalroom = 0;
                branch.totalemptyroom = 0;
                branch.totalorderedroom = 0;
                return res.json(branch);
            }
            return res.json("");
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
    // delete branch by id
    deleteBranch: async(req, res) => {
        console.log("delete branch");
        // console.log(req.params.id)
        try {
            const branchdel = await Branch.findByIdAndDelete(req.params.id);
            res.send("delete branch successfully");
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
      // update branch by id
      updateBranch: async(req,res) => {
        try {
            console.log("update branch");
            const branchUpdate = await Branch.findByIdAndUpdate(req.params.id,{name: req.body.name})
            const result = await Branch.find({})
            return res.json(result);
        } catch (error) {
            return res.status(400).json({message:error});
        }
    }
}
module.exports = branchController;