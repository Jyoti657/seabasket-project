import { createSlice } from "@reduxjs/toolkit";
import fakeOrders from "../../data/fakeOrders";
import { order } from "../../types";

interface OrderState {
  orders: order[];
}

const initialState: OrderState = {
  orders: fakeOrders,
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
});
export const {} = orderSlice.actions;
export default orderSlice.reducer;
