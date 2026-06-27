const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect =  async (req,res,next) => {

    try {
        
        const token = req.cookies.token

        if(!token){
            return res.status(401).json({
                message : "No token , not authorized"
            })
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        const user = await User.findById(decoded.id).select("-password")

        if(!user){
            return res.status(401).json({
                message : "No user found , not authorized"
            })
        }

        req.user = user
        next()
    } catch (error) {
        res.status(500).json("Token failed")
    }
}

module.exports = protect