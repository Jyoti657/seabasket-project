import { createSlice } from "@reduxjs/toolkit";
import { ProductProps } from "../../types";

interface favoritState {
  favoriteProducts: ProductProps[];
}
const initialState: favoritState = {
  favoriteProducts: [],
};

const favoritSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    toggleFavorites: (state, action) => {
      const existingProduct = state.favoriteProducts.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        state.favoriteProducts = state.favoriteProducts.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.favoriteProducts.push(action.payload);
      }
    },
    removeFavorites: (state, action) => {
      state.favoriteProducts = state.favoriteProducts.filter(
        (item) => item.id !== action.payload.id
      );
    },
    resetFavorites: (state) => {
      state.favoriteProducts = [];
    },
  },
});
export const { toggleFavorites, removeFavorites, resetFavorites } =
  favoritSlice.actions;
export default favoritSlice.reducer;
