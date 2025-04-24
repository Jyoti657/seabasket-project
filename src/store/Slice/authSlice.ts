import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Auth } from "../../types";
import { ProfileSchemaType } from "../../schema/ProfileSchema";
import { signUpSchemaType } from "../../schema/signUpSchema";
import { logInSchemaType } from "../../schema/logInSchema";
import { OtpSchemaType } from "../../schema/optSchema";
import { ForgetPasswordSchemaType } from "../../schema/forgetPasswordSchema";
import { API ,setToken,deleteToken} from "../../Api/axiosInstance";

// const setToken = (token: string) => {
//   localStorage.setItem("token", token);
//   localStorage.setItem("lastLoginTime", new Date().getDate().toString());
// };

// export const getToken = () => {
//   const now = new Date(Date.now()).getTime();
//   const timeAllowed = 1000 * 60 * 30;
//   const lastLoginTime = localStorage.getItem("lastLoginTime");
//   const token = localStorage.getItem("token");
//   if (lastLoginTime && token && now - parseInt(lastLoginTime) < timeAllowed) {
//     return token;
//   }
//   return null;
// };
// const deleteToken = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("lastLoginTime");
// };


// API.interceptors.request.use((config) => {
//   const token = getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

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
// forgot password
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
// reset password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data: ForgetPasswordSchemaType, { rejectWithValue }) => {
    try {
      const response = await API.post("/reset-password", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
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
      const response = await API.put("/update-user-profile", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
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
  verifiedUser: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      deleteToken();
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
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.otpVerified = true;
        setToken(action.payload.token);
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
        state.token = action.payload.token;
        state.otpVerified = true;
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
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.otpVerified = true;
        setToken(action.payload.token);
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
