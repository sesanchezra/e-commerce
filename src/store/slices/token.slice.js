import { createSlice } from "@reduxjs/toolkit";

export const token = createSlice({
    name:'token',
    initialState: '',
    reducers:{
        setToken: (state,action) => action.payload
    }
})

export const{ setToken} = token.actions


export default token.reducer