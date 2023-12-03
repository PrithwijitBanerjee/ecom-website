import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMenu } from "../GraphQlQueries/AllQueries";
import { statusData } from "./productSlice";


//Initial State........
const initialState = {
    status:'',
    items:[],
    error:''
};

//Thunk Middleware....................
export const handleAsyncMenu = createAsyncThunk(
    "ecomm/menus",
  async (_, { rejectWithValue }) => { // Use rejectWithValue to pass error value
    try {
      const res = await fetchMenu();
      return res;
    } catch (error) {
      return rejectWithValue(error.message); // Pass error message with rejectWithValue
    }
  }
);

// Slice ..........

export const menuSlice = createSlice({
    name:'levelFourMenus/ecomm',
    initialState,
    reducers: { // custom reducers.....
        clearError: (state) => { 
          state.error = null;
        },
      },
    extraReducers:builder=>{
        builder.addCase(handleAsyncMenu.pending,state=>{
            state.status = statusData?.LOADING;
            state.error  = '';
        })
        .addCase(handleAsyncMenu.fulfilled,(state,{payload})=>{
            state.status = statusData?.IDLE;
            state.items = payload?.data?.categoryList[0]?.children;
            state.error = '';
        })
        .addCase(handleAsyncMenu.rejected,(state,{payload})=>{
            state.status = statusData?.ERROR;
            state.error = payload;
        })
    }  
});

export const {clearError} = menuSlice.actions;
export default menuSlice.reducer;