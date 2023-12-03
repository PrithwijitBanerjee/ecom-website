import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import filterSalarySlice from "./filterSalarySlice";
import menuSlice from "./menuSlice";
import singleProductSlice from "./singleProductSlice";
import emptyCartSlice from "./emptyCartSlice";


export const myStore = configureStore({
    reducer:{
        products:productSlice,
        filterPriceProducts:filterSalarySlice,
        menusData:menuSlice,
        singleData:singleProductSlice,
        randomCartId: emptyCartSlice,
    }
});