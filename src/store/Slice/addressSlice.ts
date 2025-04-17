import { createSlice } from "@reduxjs/toolkit";




const initialState = {
  list: [],
  isLoggedIn: false,
};
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.list = action.payload;
      state.isLoggedIn = true;
    },
  },
});
export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;
