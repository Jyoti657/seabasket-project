import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreProduct } from "../../types";

interface CartState {
  productData: StoreProduct[];
}

const initialState: CartState = {
  productData: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<StoreProduct>) => {
      const existingProduct = state.productData.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.productData.push({ ...action.payload, quantity: 1 });
      }
    },

    increaseQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const existingProduct = state.productData.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const existingProduct = state.productData.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          state.productData = state.productData.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const product = state.productData.find(
        (p) => String(p.id) === action.payload.id
      );
      if (product) {
        product.quantity = action.payload.quantity;
      }
    },

    deleteProduct: (state, action: PayloadAction<string>) => {
      state.productData = state.productData.filter(
        (item) => item.id.toString() !== action.payload
      );
    },

    resetCart: (state) => {
      state.productData = [];
    },
  },
});

export const selectCartTotal = (state: { cart: CartState }) => {
  return state.cart.productData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
  updateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
