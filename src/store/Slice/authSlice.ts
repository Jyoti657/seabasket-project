import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "../../types";
import { signUpSchemaType } from "../../schema/signUpSchema";
import { logInSchemaType } from "../../schema/logInSchema";
import { profileSchemaType } from "../../schema/ProfileSchema";
import axios from "axios";

//signup
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user: signUpSchemaType, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://dummyjson.com/auth/signup", {
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user: logInSchemaType, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: user.email,
        password: user.password,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
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
        state.isAuthenticated = true;
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
      });
  },
});
export const { logOut, addProfile } = authSlice.actions;
export default authSlice.reducer;
