import mongoose from "mongoose" 
import 'dotenv/config.js'

const dbConnection = () =>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("Database connected successfully")
    }).catch((err)=>{
        console.log("Error occuring while connecting to database",err)
        process.exit(1);
    })
}


export default dbConnection