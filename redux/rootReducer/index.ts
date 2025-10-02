import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import categoryReducer from "../slices/categorySlice";


const rootReducer = combineReducers({
   auth:authReducer,
   category:categoryReducer,
})

export default rootReducer;