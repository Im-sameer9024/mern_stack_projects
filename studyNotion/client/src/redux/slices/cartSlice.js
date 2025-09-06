import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartItems:[],
    totalItems:0,
    totalAmount:0,
    isLoading:false,

}


const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        setTotalItems(state,action){
            state.totalItems = action.payload
        }

    }

})

export const {setTotalItems} = cartSlice.actions

export default cartSlice.reducer;