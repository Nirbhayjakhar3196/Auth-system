const User = require('../models/User')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')

const generateToken = (id) => {

    return jwt.sign({id} , process.env.JWT_SECRET , {
        expiresIn : "1d",
    })
}

const register = async ( req,res ) => {
    console.log(req.body);

    try {

        const {name , email , password} = req.body
        
        const user = await User.create({name , email , password})
        
        res.json({
            message : "User registered",
            token : generateToken(user._id),
            user : {
                name : user.name,
                email : user.email,
                id : user._id
            }
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
        
    }
}

const login = async (req, res) => {

    try {
        
        const {email , password} = req.body

        const user = await User.findOne({email})

        if (!user){
            return res.status(400).json({
                message : "User not registered"
            })
        }

        const isMatched = await user.comparePassword(password)
        if (!isMatched){
            return res.status(400).json({
                message : "Invalid credentials`"
            })
        }

        res.json({
            message: "Logined successfully",
            token : generateToken(user._id),
            user : {
                name : user.name,
                email : user.email,
                id : user._id
            }
        })
        
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

const forgotPassword = async (req,res) => {
    try {

        const {email} = req.body

        const user = await User.findOne({email : email.toLowerCase()})

        if(!user){
            return res.status(400).json({
                message : "User not found"
            })
        }

        const resetToken =  crypto.randomBytes(32).toString('hex')

        const hashedToken =  crypto.createHash("sha256").update(resetToken).digest("hex")

        user.resetPasswordToken = hashedToken
        user.resetPasswordExpire = Date.now() + 10*60*1000;

        await user.save({ validateBeforeSave: false });

        const resetUrl = `${process.env.FRONTEND_URL}/reset/${resetToken}`

        const message = `You requested for password reset. Click on the link to reset your password : ${resetUrl}`

        await sendEmail({
            email : user.email,
            subject : "Password reset",
            message
        })

        res.status(200).json({
            message: "Reset email sent successfully"
        });
        
    } catch (error) {           
        res.status(500).json({message : error.message})
    }

}

const resetPassword = async (req,res) => {

    try {

        const {password} = req.body

        const hashedToken =  crypto.createHash("sha256").update(req.params.token).digest("hex")

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        user.password = password

        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        
        await user.save()

        res.json({
            message : "password reset successfully"
        })

    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

module.exports = { register, login , forgotPassword, resetPassword }

