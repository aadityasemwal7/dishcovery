const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const users  =  [
    {
        id : 1,
        email: "test@example.com",
        password: "pass123", // hashed password for "password123"
    }
]

// login user
exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    const user = users.find((u) => u.email === email)
    if(!user){
        return res.status(400).json({message : "Invalid Credentials"})
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({message: "Invalid email or password!"})

    const token = jwt.sign({id : user.id}, process.env.JWT_SECRET, {expiresIn: "1h"})  
    
    res.json({token, user : {id : user.id, email: user.email}})
}

exports.registerUser = async (req, res) => {
    const {email, password} = req.body

    const userExists = users.find(u => u.email === email)
    if(userExists) return res.status(400).json({message: "user already exists! Please login!"})
     
    const hashedPassword = await bcrypt.hash(password, 10)  

    const newUser = {id: users.length + 1, email: email, password: hashedPassword}
    users.push(newUser)

    res.status(201).json({message: "users registered successfully!"})
}