import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";


export const myStore = configureStore({
    reducer:{
        products:productSlice,
    }
})