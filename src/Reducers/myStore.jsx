import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import filterSalarySlice from "./filterSalarySlice";
import menuSlice from "./menuSlice";


export const myStore = configureStore({
    reducer:{
        products:productSlice,
        filterPriceProducts:filterSalarySlice,
        menusData:menuSlice,
    }
})