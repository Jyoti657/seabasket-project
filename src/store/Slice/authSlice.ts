import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Auth } from "../../types";
import { ProfileSchemaType } from "../../schema/ProfileSchema";
import { signUpSchemaType } from "../../schema/signUpSchema";
import { logInSchemaType } from "../../schema/logInSchema";
import { OtpSchemaType } from "../../schema/optSchema";
import { ForgetPasswordSchemaType } from "../../schema/forgetPasswordSchema";
import { API } from "../../Api/axiosInstance";
const authApi = `/auth`;

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user: signUpSchemaType, { rejectWithValue }) => {
    try {
      const response = await API.post(`${authApi}/sign-up`, user);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user: logInSchemaType, { rejectWithValue }) => {
    try {
      const response = await API.post(`${authApi}/sign-in`, user);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (otpData: OtpSchemaType, { rejectWithValue }) => {
    try {
      const response = await API.post(`${authApi}/verify-otp`, otpData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
// forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data: ForgetPasswordSchemaType, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;
      const response = await API.post(`${authApi}/forgot-password`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.token;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
// reset password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data: { token: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await API.post(
        `${authApi}/reset-password/${data.token}`,
        {
          password: data.password,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
//  Update profile
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data: ProfileSchemaType, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;
      const response = await API.put(`${authApi}/update-user-profile`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: Auth = {
  userId: null,
  user: null,
  token: null,
  isAuthenticated: false,
  otpVerified: false,
  authError: null,
  isLoading: false,
  registerUser: false,
  verifiedUser: {},
  reset: null,
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
        state.userId = action.payload.user?.id;
        state.user = action.payload.user;
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
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.verifiedUser;

        state.token = action.payload.token;
        state.otpVerified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.authError = action.payload as string;
      })
      //forgotPassword
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.authError = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.reset = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.authError = action.payload as string;
      })
      //restPassword
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.authError = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reset = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.authError = action.payload as string;
      })
      //updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.authError = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload.profile;
          state.isAuthenticated = true;
        } else {
          state.authError = "Update failed. No user data returned.";
        }
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.authError = action.payload as string;
      });
  },
});
export const { logOut } = authSlice.actions;
export default authSlice.reducer;
