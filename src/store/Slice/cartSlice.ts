import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductProps } from "../../types";
import { API } from "../../Api/axiosInstance";

const cartApi = "/cart";

// Fetch Cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;
      const response = await API.get(`${cartApi}/get-cart`, {
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

// Add to Cart
export const addCart = createAsyncThunk(
  "cart/addCart",
  async (id: number, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;
      const response = await API.post(
        `${cartApi}/add-to-cart`,
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface CartState {
  productData: ProductProps[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  productData: [],
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.productData = [];
    },
    removeItem: (state, action: { payload: number }) => {
      const removeItemId = action.payload;
      state.productData = state.productData.filter(
        (item) => item.id !== removeItemId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = action.payload.cart.map((item: any) => ({
          ...item.product,
          quantity: item.quantity,
          cartID: item.id,
        }));
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // addCart
      .addCase(addCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.loading = false;
        debugger

        const existingProduct = state.productData.find(
          (item) => item.id === action.payload.id
        );

        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          state.productData.push({ ...action.payload, quantity: 1 });
        }
      })
      .addCase(addCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.productData.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0
  );

export const { resetCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
