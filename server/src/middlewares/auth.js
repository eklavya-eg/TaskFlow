jwt = require("jsonwebtoken")
const {jwtPass} = require('../config')
function tokenValidation(req,res,next){
    const token = req.headers.authorization
    if(!token){
        return res.status(400).json({msg:"token not found"})
    }
    try{
        const {username} = jwt.verify(token, jwtPass)
        req.user = username
    }
    catch (err){
        return res.status(403).json({
            msg:"invalid token",
        })
    }
    next()
}
module.exports={tokenValidation}