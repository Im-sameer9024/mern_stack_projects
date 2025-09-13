import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import dbConnection from './config/db.js'
import cloudinaryConnect from './config/cloudinary.js'
import UserRoute from './routes/User.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

await dbConnection()
await cloudinaryConnect()

app.use("/api", UserRoute)

app.get("/",(req,res) =>{
    res.send("Hello World")
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})