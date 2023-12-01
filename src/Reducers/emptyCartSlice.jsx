import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleCreateCart } from "../GraphQlMutation/CreateEmptyCart";
import { statusData } from "./productSlice";

//Initial State...

const initialState = {
    status:'',
    cartId:'',
    error:''
};

//Thunk Middleware....

export const createEmptyCartAsync = createAsyncThunk(
    'cart/createEmptyCart',
    async (_, { rejectWithValue }) => {
      try {
        const cartData = await handleCreateCart();
        return cartData;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


//Slice.............

const emptyCartSlice = createSlice({
    name:'createEmptyCart/cart',
    initialState,
    extraReducers:builder=>{
        builder.addCase(createEmptyCartAsync.pending,state=>{
                state.status = statusData?.LOADING;
                state.error = '';
        })
        .addCase(createEmptyCartAsync.fulfilled,(state,{payload})=>{
                state.status = statusData?.IDLE;
                state.cartId = payload;
        })
        .addCase(createEmptyCartAsync.rejected,(state,{payload})=>{
                state.status = statusData?.ERROR;
        })
    }
})

export default emptyCartSlice.reducer;