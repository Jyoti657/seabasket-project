import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addressForm } from "../../types";

interface AddressState {
  list: addressForm[];
  isLoggedIn: boolean;
}

const initialState: AddressState = {
  list: [],
  isLoggedIn: false,
};
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<addressForm[]>) => {
      state.list = action.payload;
      state.isLoggedIn = true;
    },
  },
});
export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;
