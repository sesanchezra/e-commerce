import { configureStore } from "@reduxjs/toolkit";
import products from './slices/products.slice'
import  user  from "./slices/user.slice";
import token from './slices/token.slice'

export default configureStore({
    reducer:{
        products,
        user,
        token
    }
})