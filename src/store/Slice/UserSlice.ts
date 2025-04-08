import { createSlice } from "@reduxjs/toolkit";
import { userProfile, order } from "../../types";

interface userState {
  user: userProfile | null;
  order: order[] | null;
  isLoggedIn: boolean;
}
const initialState: userState = {
  user: null,
  order: null,
  isLoggedIn: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    updateUserProfile: (state, action) => {
        if (state.user) {
            state.user = { ...state.user, ...action.payload };
        }
        },
    logoutUser: (state) => {
      state.user = null;
      state.order = null;
      state.isLoggedIn = false;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});
 export const { setUser, logoutUser, setOrder,updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
