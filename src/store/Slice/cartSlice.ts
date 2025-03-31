
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreProduct } from "../../types";

// ✅ Define the cart state interface
interface CartState {
  productData: StoreProduct[];
}

// ✅ Initial state (empty, since redux-persist will load it)
const initialState: CartState = {
  productData: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ Add item to cart
    addToCart: (state, action: PayloadAction<StoreProduct>) => {
      const existingProduct = state.productData.find((item) => item.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.productData.push({ ...action.payload, quantity: 1 });
      }
    },

    // ✅ Increase item quantity
    increaseQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const existingProduct = state.productData.find((item) => item.id === Number(action.payload.id));
      if (existingProduct) {
        existingProduct.quantity += 1;
      }
    },

    // ✅ Decrease item quantity
    decreaseQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const existingProduct = state.productData.find((item) => item.id === Number(action.payload.id)
    );
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          state.productData = state.productData.filter((item) => item.id !== Number(action.payload.id));
        }
      }
    },

    // ✅ Remove item from cart
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.productData = state.productData.filter((item) => item.id !== Number(action.payload));
    },

    // ✅ Reset cart (clear all items)
    resetCart: (state) => {
      state.productData = [];
    },
  },
});

// Export actions
export const { addToCart, increaseQuantity, decreaseQuantity, deleteProduct, resetCart } =
  cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
