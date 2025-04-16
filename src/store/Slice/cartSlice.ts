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
});

export const selectCartTotal = (state: { cart: CartState }) => {
  return state.cart.productData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

export const { addToCart, deleteProduct, resetCart, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
