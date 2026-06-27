const express = require('express')
const router = express.Router()

const {register , login, forgotPassword, resetPassword , refreshToken } = require('../controllers/authController')
const protect = require('../middleware/authMiddleware')
const authorize = require('../middleware/authorize')

router.post('/register' , register)
router.post('/login' , login)
router.post('/forgot-password' , forgotPassword)
router.post('/reset-password/:token' , resetPassword)
router.post('/refresh-token' , refreshToken)

router.get("/me" , protect ,(req,res) => {
    res.json({
        message : "Access granted",
        user : req.user,
    })
} )

router.get("/admin" , protect , authorize("admin") , (req,res) => {
    res.json({
        message : "Access granted to admin",
        admin : req.user,
    })
})

module.exports = router