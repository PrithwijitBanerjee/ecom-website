import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statusData } from "./productSlice";
import { fetchSingleProduct } from "../GraphQlQueries/AllQueries";

// Initial State..............
const initialState = {
  status: "",
  item: {},
  error: "",
};

// Thunk Middleware.................
export const fetchParticularProductAsync = createAsyncThunk(
  "ecomm/singleProduct",
  async ({ url_key }, { rejectWithValue }) => {
    try {
      const response = await fetchSingleProduct(url_key);
      return response;
    } catch (error) {
      // Return error message using rejectedWithValue
      return rejectWithValue(error.message);
    }
  }
);

// Slice ............

export const singleProductSlice = createSlice({
  name: "particularProduct/ecomm",
  initialState,
  reducers: {
    clearItem: (state) => {
      state.item = {};
      state.error = "";
      state.status = statusData?.LOADING;
    },
    clearError: state =>{
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParticularProductAsync.pending, (state) => {
        state.status = statusData?.LOADING;
        state.error = "";
      })
      .addCase(fetchParticularProductAsync.fulfilled, (state, { payload }) => {
        state.status = statusData?.IDLE;
        state.item = payload;
        state.error = "";
      })
      .addCase(fetchParticularProductAsync.rejected, (state, { payload }) => {
        state.status = statusData?.ERROR;
        state.error = payload; // Payload here will contain the error message
      });
  },
});

export const { clearItem, clearError } = singleProductSlice.actions;
export default singleProductSlice.reducer;
