import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { baseUrl } from "../Components/Commons/BaseUrl";
import axios from "axios";

const Query = `{
  products(search: "", pageSize: 200) {
    items {
      id
      name
      sku
      price {
        regularPrice {
          amount {
            value
            currency
          }
        }
      }
      image {
        url
      }
    }
  }
}`;

//Store Status......................................
export const statusData = Object.freeze({
  LOADING: "loading",
  ERROR: "error",
  IDLE: "idle",
}); // Read Only....


//Initial State......
const initialState = {
  productsData: [],
  status:'',
}

// Thunk Middleware .............................................

export const handleProductsData = createAsyncThunk("user/products", async () => {
  try {
    const res = await axios.post(baseUrl, {
      query: Query,
    });

    return res?.data?.data?.products?.items;
  } catch (error) {
    console.log("Error while fetching data from API ");
    return error;
  }
});

//Reducers......................................................

const productSlice = createSlice({
  name: "products/usersEcomm",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(handleProductsData.pending, (state) => {
      state.status = statusData?.LOADING;
    })
    .addCase(handleProductsData.fulfilled, (state,action)=>{
        state.status = statusData?.IDLE;
        state.productsData = action.payload;
    })
    .addCase(handleProductsData.rejected,state=>{
        state.status = statusData?.ERROR;
    })
  },
});

export default productSlice.reducer;