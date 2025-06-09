const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


// login user
exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({message : "Invalid Credentials"})
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({message: "Invalid email or password!"})

    const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn: "1h"})  
    
    res.json({token, user : {id : user._id, username: user.username, email: user.email}})
    }
    catch(err){
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists! Please login!' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const {username, email} = req.body
        const user = await User.findByIdAndUpdate(req.user.id, {username, email}, {new: true})
        res.json({user: {id: user._id, username: user.username, email: user.email}})
    }catch(err){
        res.status(500).json({message: "could not update user"})
    }
}

exports.updatePassword = async (req, res) => {
    const {currPassword, newPassword} = req.body;
    try {
        const user = await User.findById(req.user.id)
        if(!user){
            return res.status(404).json({message: "User not found!"})
        }

        const isMatch = await bcrypt.compare(currPassword, user.password)
        if(!isMatch){
            return res.status(404).json({message: "invalid current password!"})
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword;
        await user.save();

        res.json({message: "Password updated successfully!"})
    }catch(err) {res.status(500).json({message: `could not update password: ${err}`})}
}
