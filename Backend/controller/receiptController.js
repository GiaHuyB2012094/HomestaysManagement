const Receipt = require('../models/receipt');

const recepitsController = {
   // create receipt
   createReceipt : async(req,res) =>{
    const {
        name,
        branch,
        nameEmployee,
        note,
        price,
        type,
        date,
        isPayment} = req.body;
    try {
        console.log("add receipt ")
        const newreceipt = new Receipt({
            name,
            branch,
            nameEmployee,
            note,
            price,
            type,
            date,
            isPayment,});
        
        const receipt = await newreceipt.save();

        const receipts = await Receipt.find({});
        return res.json(receipts);
        } catch (error) {
            console.log(error);
        }
    },
    getAllReceips : async(req, res) => {
        console.log("get all Receipt")
        try {
            const receipts = await Receipt.find({})      
            return res.json(receipts);      
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
    // delete receipt by id
    deleteReceipt: async(req, res) => {
        console.log("delete receipt");
        try {
            const receiptdel = await Receipt.findByIdAndDelete(req.params.id);
            res.send("delete receipt successfully");
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
    // update receipt by id
    updateReceipt: async(req,res) => {
        const {
            name,
            branch,
            nameEmployee,
            note,
            price,
            type,
            date,
            isPayment} = req.body;
        try {
            console.log("update receipt ");
            console.log(req.body)
            const receiptUpdate = await Receipt.findByIdAndUpdate(req.params.id,{
                name,
                branch,
                nameEmployee,
                note,
                price,
                type,
                date,
                isPayment})
            const receipts = await Receipt.find({});
            return res.json(receipts);
        } catch (error) {
            return res.status(400).json({message:error});
        }
    }
}

module.exports = recepitsController;