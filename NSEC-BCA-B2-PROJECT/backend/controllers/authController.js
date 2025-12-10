const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register
exports.register = async (req,res) => {
    const {name,email,password} = req.body;
    try {
        const hashpassword = await bcrypt.hash(password,15);
        const user = await User.create({name,email,password:hashpassword})
        res.status(201).json({message:"user register success"});
    } catch(err) {
        res.status(400).json({message:"user already exists"});
    }
};
//login
exports.login = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"invalid credential"});

        const match = await bcrypt.compare(password,user.password);
         if(!match) return res.status(400).json({message:"invalid credential"});

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.json({token});
    } catch(err) {
        res.status(500).json({message:"login failed"});
    }
};