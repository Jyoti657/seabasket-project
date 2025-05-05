import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { order } from "../../types";
import { API } from "../../Api/axiosInstance";

const orderAPI = "/order";

export const orderPlace = createAsyncThunk<
  order,
  { paymentType: string; addressId: string }
>("order/orderPlace", async (orderData, { rejectWithValue, getState }) => {
  try {
    const state: any = getState();
    const token = state.auth.token;

    const response = await API.post(`${orderAPI}/place-order`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.order;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Get all user orders
export const getUserOrder = createAsyncThunk<order[]>(
  "order/getUserOrder",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;

      const response = await API.get(`${orderAPI}/get-user-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.orders;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const orderStatus = createAsyncThunk(
  "order/getOrderStatus",
  async (orderId: string, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;

      const response = await API.get(
        `${orderAPI}/get-order-status/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { orderId, status: response.data.status };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice State
interface OrderState {
  orders: order[];
  loading: boolean;
  error: string | null;
  selectedPaymentType: string;
  selectedAddressId: string;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
  selectedPaymentType: "",
  selectedAddressId: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedPaymentType(state, action: PayloadAction<string>) {
      state.selectedPaymentType = action.payload;
    },
    setSelectedAddressId(state, action: PayloadAction<string>) {
      state.selectedAddressId = action.payload;
    },
    resetOrderError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderPlace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderPlace.fulfilled, (state, action) => {
        state.loading = false;
        const newOrder = action.payload;
        state.orders.push(newOrder);
      })
      .addCase(orderPlace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getUserOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(orderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderStatus.fulfilled, (state, action) => {
        state.loading = false; // ✅ Add this line
        const { orderId, status } = action.payload;

        const orderToUpdate = state.orders.find(
          (order) => order.id.toString() === orderId.toString()
        );

        if (orderToUpdate) {
          orderToUpdate.status = status; // ✅ Assuming status is a direct property
        }
      })

      .addCase(orderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedPaymentType, setSelectedAddressId, resetOrderError } =
  orderSlice.actions;

export default orderSlice.reducer;
