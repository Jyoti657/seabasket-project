import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 import axios from "axios";
import { addressSchemaType } from "../../schema/addressSchema";
import {Auth} from "../../types"
import { setToken } from "../../Api/axiosInstance";
 
 const API = axios.create({
    baseURL: "http://localhost:3100/address",

 })

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (addressData: addressSchemaType, { rejectWithValue ,getState }) => {
    try {
      const state:any=getState();
      const token =state.auth.token;
      const response = await API.post("/add-address", addressData,{
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      });
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


// interface  {
//   list: any[];
//   isLoggedIn: boolean;
// }

const initialState: Auth = {
 
user:null,
  token: "",
  isAuthenticated: true,
  otpVerified: false,
  authError: null,
  isLoading: false,
  registerUser: true,
  verifiedUser: true,

};
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => { 
    builder
      .addCase(addAddress.pending, (state) => {
        state.isLoading=true;
        state.authError=null
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        // state.list.push(action.payload);
        // state.isLoggedIn = true;
        if(action.payload){
          state.user=action.payload.address
          state.isLoggedIn=true
        }
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
