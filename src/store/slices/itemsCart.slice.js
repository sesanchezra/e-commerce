import { createSlice } from "@reduxjs/toolkit";

export const itemsCart = createSlice({
    name: 'items',
    initialState: 0,
    reducers:{
        setItemsCart: (state,action) => action.payload
    }
})

export const {setItemsCart} =itemsCart.actions


export default  itemsCart.reducer