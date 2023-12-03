import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statusData } from "./productSlice";
import { fetchPriceProducts } from "../GraphQlQueries/AllQueries";

//Initial State..........

const initialState = {
  items: [],
  status: "",
  error: "",
};



//Thunk Middleware............................

export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProducts",
  async ({ fromValue, toValue }, thunkAPI) => {
    try {
      const response = await fetchPriceProducts(fromValue, toValue);
      return response; // Assuming your API returns data object
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const filterSalarySlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      // Define your other reducers if needed
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchProductsAsync.pending, (state) => {
          state.status = statusData?.LOADING;
          state.error = '';
        })
        .addCase(fetchProductsAsync.fulfilled, (state, action) => {
          state.status = statusData?.IDLE;
          state.items = action.payload;
          state.error = '';
        })
        .addCase(fetchProductsAsync.rejected, (state, action) => {
          state.status = statusData?.ERROR;
          state.error = action.payload;
        });
    },
  });
  
//   export const { /* export your actions if needed */ } = filterSalarySlice.actions;
  
  export default filterSalarySlice.reducer;

