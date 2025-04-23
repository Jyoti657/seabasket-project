import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 import axios from "axios";
 
 const API = axios.create({
    baseURL: "http://localhost:3100/address",

 })

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (addressData: any, { rejectWithValue }: { rejectWithValue: (value: any) => void }) => {
    try {
      const response = await API.post("/add-address", addressData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/get-address/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


interface AddressState {
  list: any[];
  isLoggedIn: boolean;
}

const initialState: AddressState = {
  list: [],
  isLoggedIn: false,
};
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => { 
    builder
      .addCase(addAddress.pending, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.isLoggedIn = false;
      })
      .addCase(addAddress.rejected, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(fetchAddress.pending, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoggedIn = false;
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.isLoggedIn = false;
      });
  }
});
export const {  } = addressSlice.actions;
export default addressSlice.reducer;
