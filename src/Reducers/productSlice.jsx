import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts } from "../GraphQlQueries/AllQueries";

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
  error: '',
}

// Thunk Middleware .............................................

export const handleProductsData = createAsyncThunk(
  "user/products",
  async (_, { rejectWithValue }) => { // Use rejectWithValue to pass error value
    try {
      return await fetchAllProducts();
    } catch (error) {
      return rejectWithValue(error.message); // Pass error message with rejectWithValue
    }
  }
);

//Reducers......................................................

const productSlice = createSlice({
  name: "products/usersEcomm",
  initialState,
  reducers: { // custom reducers.....
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleProductsData.pending, (state) => {
      state.status = statusData?.LOADING;
      state.error = '';
    })
    .addCase(handleProductsData.fulfilled, (state,action)=>{
        state.status = statusData?.IDLE;
        state.productsData = action.payload;
        state.error = '';
    })
    .addCase(handleProductsData.rejected,(state,{payload})=>{
        state.status = statusData?.ERROR;
        state.error = payload;
    })
  },
});


export const { clearError } = productSlice.actions;
export default productSlice.reducer;