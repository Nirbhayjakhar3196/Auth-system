const express = require('express')
const router = express.Router()

const {register , login, forgotPassword, resetPassword } = require('../controllers/authController')
const protect = require('../middleware/authMiddleware')

router.post('/register' , register)
router.post('/login' , login)
router.post('/forgot-password' , forgotPassword)
router.post('/reset-password/:token' , resetPassword)

router.get("/me" , protect ,(req,res) => {
    res.json({
        message : "Access granted",
        user : req.user,
    })
} )

module.exports = router