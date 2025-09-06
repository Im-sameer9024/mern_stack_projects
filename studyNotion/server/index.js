/* eslint-disable no-undef */
import express from 'express'
import'dotenv/config.js'
import dbConnection from './config/database.js'
import cloudinaryConnect from './config/cloudinary.js'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import cors from 'cors'

//------------Routes----------------
import userRoutes from './routes/User.js'
import profileRoutes from './routes/Profile.js'
import courseRoutes from './routes/Course.js'

const app = express()

const port = process.env.PORT || 8080


// middlewares 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/'
    })
)
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
    methods:["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization","Origin","X-Requested-With","Accept"]
}))

//-----------cloudinary connection------------
cloudinaryConnect()

//-----------database connection------------

dbConnection()

//----------- Mounting routes----------------

app.use("/api", userRoutes)
app.use("/api", profileRoutes)
app.use("/api", courseRoutes)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


