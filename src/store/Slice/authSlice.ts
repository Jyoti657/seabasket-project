import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "../../types";
import { profileSchemaType } from "../../schema/ProfileSchema";
import { signUpSchemaType } from "../../schema/signUpSchema";
import { logInSchemaType } from "../../schema/logInSchema";
import { OtpSchemaType } from "../../schema/optSchema";
import { ForgetPasswordSchemaType } from "../../schema/forgetPasswordSchema";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3100/auth",
});

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user: signUpSchemaType, { rejectWithValue }) => {
    try {
      const response = await API.post("/sign-up", user);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user: logInSchemaType, { rejectWithValue }) => {
    try {
      const response = await API.post("/sign-in", user);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (otpData: OtpSchemaType, { rejectWithValue }) => {
    try {
      const response = await API.post("/verify-otp", otpData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
  export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (data: ForgetPasswordSchemaType, { rejectWithValue }) => {
      try {
        const response = await API.post("/forgot-password", data);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );

const initialState: Auth = {
  user: null,
  token: null,
  isAuthenticated: false,
  otpVerified: false,
  authError: null,
  isLoading: false,
  registerUser: false,

};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    addProfile: (state, action: PayloadAction<profileSchemaType>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.authError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.registerUser = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.authError = action.payload as string;
      })
      //login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.authError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.authError = action.payload as string;
      })
      //verifyOtp
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
        state.authError = null;
      }
      )
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.otpVerified = true;
      }
      )
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.authError = action.payload as string;
      }
      )
      //forgotPassword
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.authError = null;
      }
      )
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.otpVerified = true;
      }
      )
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.authError = action.payload as string;
      }
      );
  },
});
export const { logOut, addProfile } = authSlice.actions;
export default authSlice.reducer;
