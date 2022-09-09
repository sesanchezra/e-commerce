import { configureStore } from "@reduxjs/toolkit";
import products from './slices/products.slice'
import  itemsCart  from "./slices/itemsCart.slice";


export default configureStore({
    reducer:{
        products,
        itemsCart
    }
})