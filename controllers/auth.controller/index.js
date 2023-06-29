const {hash, compare} = require("bcrypt")
const { SECRET_KEY } = require("../../config")
const { findUser, newUser } = require("./module")
const jwt = require("jsonwebtoken")

exports.Register = async(req,res) => {
    const {username, password} = req.body
    if (!username || !password) return res.status(400).json({error: "Plase field all the fields!"})
    const user = await findUser(username)
    if (user) return res.status(403).json({error: "Sorry but this user is already exist!"})
    const hashPassword = await hash(password, 12)
    const newuser =  await newUser(username, hashPassword)
    const token = jwt.sign({id: newuser.id}, SECRET_KEY, {expiresIn: "30d"})
    res.status(201).json({message: "User registered successfully", token})
}

exports.Login = async(req, res) => {
    const {username, password} = req.body
    if (!username || !password) return res.status(400).json({error: "Plase field all the fields!"})
    const user = await findUser(username)
    if (!user) return res.status(401).json({error: "User not found!"})
    const comparePass = await compare(password, user.password)
    if (!comparePass) return res.status(403).json({error: "Forbidden"})
    const token = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: "30d"})
    res.status(200).json({message: "Login successfuly", token})
}

