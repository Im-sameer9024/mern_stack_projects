import mongoose from "mongoose";


const RatingAndReviewModel = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating:{
        type:Number,
        required: true
    },
    review:{
        type:String,
        required: true,
        trim:true,
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        index:true,
    }
    
},{timestamps: true, minimize: true })


export default mongoose.model("RatingAndReview", RatingAndReviewModel);