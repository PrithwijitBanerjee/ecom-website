import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../Components/Commons/BaseUrl";
import axios from "axios";
import { statusData } from "./productSlice";

//Initial State..........

const initialState = {
  items: [],
  status: "",
  error: "",
};

// Function to fetch products based on a price range using GraphQL
const fetchProducts = async (fromValue, toValue) => {
  try {
    const query = `
        query {
          products(
            filter: {
              price: {
                from: "${fromValue}"
                to: "${toValue}"
              }
            }
            pageSize: 200
          ) {
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
        }
      `;

    const response = await axios.post(baseUrl, { query });

    if (response.status !== 200) {
      throw new Error("Failed to fetch products");
    }

    return response?.data?.data?.products?.items;
  } catch (error) {
    throw new Error(error.message);
  }
};

//Thunk Middleware............................

export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProducts",
  async ({ fromValue, toValue }, thunkAPI) => {
    try {
      const response = await fetchProducts(fromValue, toValue);
      return response?.data; // Assuming your API returns data object
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

