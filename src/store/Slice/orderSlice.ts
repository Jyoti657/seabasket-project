import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fakeOrders from "../../data/fakeOrders";
import { order } from "../../types";
 import {API} from "../../Api/axiosInstance"
 const orderAPI="/order"

 export const orderPlace=createAsyncThunk(
  "order/orderPlace",
  async(_,{rejectWithValue,getState})=>{
    try{
      const state:any=getState();
      const token=state.any.token;
      const response =await API.post(`${orderAPI}/place-order`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      return response.data;
    }
    catch(error:any){
      return rejectWithValue(error.message)
    }

  })
 

interface OrderState {
  orders: order[];
  loading:boolean
  error:null| string
}

const initialState: OrderState = {
  orders: fakeOrders,
  loading:false,
  error:null
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
    .addCase(orderPlace.pending,(state)=>{
      state.loading=true;
      state.error=null
    })
    .addCase(orderPlace.fulfilled,(state,action)=>{
      state.loading=false;
      state.orders=action.payload
    })
    .addCase(orderPlace.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload as string
    })
  }
});
export const {} = orderSlice.actions;
export default orderSlice.reducer;
