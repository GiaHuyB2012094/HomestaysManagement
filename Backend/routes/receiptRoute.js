const express = require('express')
const router = express.Router()

const recepitsController = require('../controller/receiptController');
// routers
router.post('/createreceipt/',recepitsController.createReceipt);
router.get('/getallreceipt',recepitsController.getAllReceips);
router.delete('/deletereceiptbyid/:id',recepitsController.deleteReceipt);
router.put('/updatereceipt/:id',recepitsController.updateReceipt)
module.exports = router;