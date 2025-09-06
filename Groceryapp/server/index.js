import express from 'express';
import cors from 'cors';
import "dotenv/config.js"
import dbConnection from './config/db.js';
import cloudinaryConnect from './config/cloudinary.js';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';

import UserRoute from './routes/User.js'
import CategoryRoute from './routes/Category.js'
import ProductRoute from './routes/Product.js'
import CartRoute from './routes/Cart.js'




const app = express();
const port = process.env.PORT || 4000;


//------------- middlewares is here-----------------

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}))

//--------------database connection is here-----------------
await cloudinaryConnect()
await dbConnection()



//------------- routes is here mounted -----------------

app.use("/api",UserRoute)
app.use("/api",CategoryRoute)
app.use("/api",ProductRoute)
app.use("/api",CartRoute)



app.get("/",(req,res)=>{
    res.send("hello world")
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})



