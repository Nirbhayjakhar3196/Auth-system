require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')

const connectDB = require('./src/config/db')

connectDB()

const server  = async () => {
    try {
        
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })


    } catch (error) {
        console.log(error);
        
    }
}

server()