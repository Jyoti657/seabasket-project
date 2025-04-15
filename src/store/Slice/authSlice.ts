import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "../../types";
import { signUpSchemaType } from "../../schema/signUpSchema";
import { logInSchemaType } from "../../schema/logInSchema";

const fake_user = {
  name: "abc",
  email: "abc123@gmail.com",
  password: "123456",
};

const initialState: Auth = {
  user: null,
  token: null,
  isAuthenticated: false,
  otpVerified: false,
  authError: null,
  isLoading: false,
  registerUser: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<signUpSchemaType>) => {
      const { name, email, phone, password } = action.payload;
      (state.user = {
        name,
        email,
        password,
        phone,
      }),
        (state.token = "mock-token-abc");
      state.isAuthenticated = true;
      state.authError = null;
    },

    setCredinatials: (state, action: PayloadAction<logInSchemaType>) => {
      const { email, password } = action.payload;
      if (email === fake_user.email && password === fake_user.password) {
        state.user = {
          email,
          password,
        };
        state.token = "mock-token-abc";
        state.isAuthenticated = true;
      } else {
        state.authError = "Invalid email or password";
        state.isAuthenticated = false;
      }
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});
export const { setCredinatials, logOut, registerUser } = authSlice.actions;
export default authSlice.reducer;
