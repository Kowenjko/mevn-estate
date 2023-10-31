import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'

dotenv.config()

try {
	mongoose.connect(process.env.MONGO)
	console.log('Connected to MongoDB!')
} catch (error) {
	console.error(error)
}

const app = express()

app.listen(3000, () => {
	console.log('Server is running on port 3000!')
})

app.use('/api/user', userRouter)
