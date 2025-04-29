import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductProps } from "../../types";
import { API } from "../../Api/axiosInstance";

const wishlistApi = "/wishlist";

export const wishlistadd = createAsyncThunk(
  "products/wishlistadd",
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;
      const response = await API.post(
        `${wishlistApi}/add-to-wishlist`,
        { productId: id },
        {
          headers: {
            "Content-Type": "application/json",
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
export const getWhislist = createAsyncThunk(
  "products/getWishlist",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;
      const response = await API.get(`${wishlistApi}/get-wishlist`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteWishlist = createAsyncThunk(
  "products/deleteWishlist",
  async (wishlistItemId: string, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;
      const response = await API.delete(
        `${wishlistApi}/remove-from-wishlist/${wishlistItemId}`,
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

interface FavoriteState {
  favoriteProducts: ProductProps[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FavoriteState = {
  favoriteProducts: [],
  isLoading: false,
  error: null,
};

const favoritSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    resetFavorites: (state) => {
      state.favoriteProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(wishlistadd.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(wishlistadd.fulfilled, (state, action) => {
        state.isLoading = false;

        const exists = state.favoriteProducts.find(
          (item) => item.id === action.payload.id
        );

        if (!exists) {
          state.favoriteProducts.push(action.payload);
        }
      })
      .addCase(wishlistadd.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        console.error("Failed to add to wishlist:", action.payload);
      })
      .addCase(getWhislist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWhislist.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("this product", action.payload);
        state.favoriteProducts = action.payload.wishlistItems;
      })
      .addCase(getWhislist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedItemId = action.payload.id;
        state.favoriteProducts = state.favoriteProducts.filter(
          (item) => item.id !== deletedItemId
        );
      })

      .addCase(deleteWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetFavorites } = favoritSlice.actions;
export default favoritSlice.reducer;
