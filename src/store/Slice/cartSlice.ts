import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductProps } from "../../types";
import axios from "axios";
const basic_URL = "https://dummyjson.com/carts";
// all the cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${basic_URL}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// add cart

export const fetchCartAdd = createAsyncThunk(
  "cart/fetchCartAdd",
  async (product: ProductProps, thunkAPI) => {
    try {
      const response = await axios.post(`${basic_URL}/add`, {
        userId: 1,
        products: [
          {
            id: product.id,
            quantity: 1,
          },
        ],
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
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
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const product = state.productData.find((p) => p.id === action.payload.id);
      if (product) {
        product.quantity = action.payload.quantity;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.productData = state.productData.filter(
        (item) => item.id !== action.payload
      );
    },
    resetCart: (state) => {
      state.productData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && Array.isArray(action.payload.products)) {
          state.productData = action.payload.products;
        }
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart";
      })
      .addCase(fetchCartAdd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartAdd.fulfilled, (state, action) => {
        state.loading = false;
        const products = action.payload?.products;
        if (products && Array.isArray(products)) {
          state.productData.push(...products);
        }
      })
      .addCase(fetchCartAdd.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add product to cart";
      });
  },
});

export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.productData.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0
  );

export const { deleteProduct, resetCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
