import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "../../types";


const initialState: Auth = {
  user: null,
  isAuthenticated: false,
  otpVerified: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser:(state,action:PayloadAction<{email?:string; phone?:string}>)=>{
    state.user=action.payload;
    state.isAuthenticated=false

    },
    verifyOtp:(state)=>{
        state.otpVerified=true
        state.isAuthenticated=true;
    },
    logoutUser:(state)=>{
        state.user=null;
        state.isAuthenticated=false
        state.otpVerified=false
    }

  },
});
export const {loginUser,verifyOtp,logoutUser}=authSlice.actions
export default authSlice.reducer;
