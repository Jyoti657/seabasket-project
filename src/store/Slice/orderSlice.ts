import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { order } from "../../types"; // Ensure 'order' is correctly defined in "../../types"
import { API } from "../../Api/axiosInstance";



const orderAPI = "/order";

export const orderPlace = createAsyncThunk(
  "order/orderPlace",
  async (
    orderData: { paymentType: string; addressId: string },
    { rejectWithValue, getState }
  ) => {
    try {
      const state: any = getState();
      const token = state.auth.token;

      const response = await API.post(`${orderAPI}/place-order`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.newOrder;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const getUserOrder = createAsyncThunk(
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

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface OrderState {
  orders: order[]
  loading: boolean;
  error: null | string;

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
        state.orders.push(action.payload);
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
      });
  },
});

export const { setSelectedPaymentType, setSelectedAddressId, resetOrderError } =
  orderSlice.actions;

export default orderSlice.reducer;
// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { order } from "../../types";
// import { API } from "../../Api/axiosInstance";

// const orderAPI = "/order";

// export const orderPlace = createAsyncThunk(
//   "order/orderPlace",
//   async (
//     _,
//     { rejectWithValue, getState }
//   ) => {
//     try {
//       const state: any = getState();
//       const token = state.auth.token;

//       const response = await API.post(`${orderAPI}/place-order`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       return response.data.newOrder;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const getUserOrder = createAsyncThunk(
//   "order/getUserOrder",
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const state: any = getState();
//       const token = state.auth.token;

//       const response = await API.get(`${orderAPI}/get-user-orders`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// interface OrderState {
//   orders: order[];
//   loading: boolean;
//   error: string | null;
//   selectedPaymentType: string;
//   selectedAddressId: string;
// }

// const initialState: OrderState = {
//   orders: [],
//   loading: false,
//   error: null,
//   selectedPaymentType: "",
//   selectedAddressId: "",
// };

// const orderSlice = createSlice({
//   name: "order",
//   initialState,
//   reducers: {
//     setSelectedPaymentType(state, action: PayloadAction<string>) {
//       state.selectedPaymentType = action.payload;
//     },
//     setSelectedAddressId(state, action: PayloadAction<string>) {
//       state.selectedAddressId = action.payload;
//     },
//     resetOrderError(state) {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(orderPlace.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(orderPlace.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orders.push(action.payload);
//       })
//       .addCase(orderPlace.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       .addCase(getUserOrder.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getUserOrder.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orders = action.payload;
//       })
//       .addCase(getUserOrder.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const {
//   setSelectedPaymentType,
//   setSelectedAddressId,
//   resetOrderError,
// } = orderSlice.actions;

// export default orderSlice.reducer;
