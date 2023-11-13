const express = require('express')
const router = express.Router()
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})

const usersController = require('../controller/usersController')

router.post('/register',usersController.register)
router.post('/login',usersController.login)
router.get('/getallusers',usersController.getAllUser);
router.delete('/deleteuserbyid/:id',usersController.deleteUser);
router.put('/updateuser/:id',usersController.updateUserInfo);
router.put('/changeavatarpicture/:id',upload.single('file'),usersController.changeAvatarPicture);
module.exports = router;