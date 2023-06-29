const { verify, JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")

module.exports = async(req,res,next) => {
   const token = req.headers.authorization && req.headers.authorization.split(" ")[1]
   if (!token) return res.status(401).json({error: "Invalid token"})
   const tokenVerify = verify(token, SECRET_KEY, (error, data)=> {
    if (error) {
        if (error instanceof JsonWebTokenError) {
            return res.status(401).json({error: "Invalid token"})
        }
        else if (error instanceof TokenExpiredError) {
            return res.status(401).json({error: "Token expired"})
        }
        return
    }
    req.verify =  data
    next()
   }) 
}