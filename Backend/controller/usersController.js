const User = require('../models/user')

const usersController = {
    register: async(req,res) => {
        console.log(req.body);
        const newuser = new User({name: req.body.name, email: req.body.email, password: req.body.psw});
        console.log("UUU:",newuser);   
        try {
            const user = await newuser.save()
            console.log("User:",user);
            console.log("register")
            res.status(200).json('User Register Successful')
        } catch (error) {
            console.log("Register Error");
            return res.status(400).json({message:error});
        }
    },
    login: async(req,res) => {
        const {email,psw} = req.body;
        try {
            const user = await User.findOne({email: email, password: psw})
            if(user) {
                res.send(user)
            } else {
                return res.status(400).json({message:'Login failed'});
            }
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
    getAllUser : async(req, res) => {
        console.log("get all User")
        try {
            const users = await User.find({})      
            return res.json(users);      
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
     // delete user by id
     deleteUser: async(req, res) => {
        console.log("delete user");
        // console.log(req.params.id)
        try {
            const userDel = await User.findByIdAndDelete(req.params.id);
            res.send("delete user successfully");
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
    // update profile user
    updateUserInfo: async(req, res) => {
        console.log("update user");
        const {name,psw,phone,address,cccd} = req.body;
        try {
            const userUpdate = await User.findByIdAndUpdate(req.params.id,{name,psw})
            Object.assign(userUpdate,{phone,address,cccd});
            const user = await userUpdate.save()
            // const users = await User.find({}) 
            // console.log(userUpdate);         
            return res.json(userUpdate);  
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
    //changeAvatarPicture
    changeAvatarPicture: async(req, res) => {
        console.log("change avatar picture");
        try {
            const userUpdate = await User.findOne({_id:req.params.id})
            userUpdate.avatar={};
            Object.assign(userUpdate,{avatar: req.file.filename});
            const user = await userUpdate.save()
            console.log(user);
            return res.json(user);

        } catch (error) {
            return res.status(400).json({message:error});
        }
    }
}
module.exports = usersController;