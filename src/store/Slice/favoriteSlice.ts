import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductProps } from "../../types";
import { API } from "../../Api/axiosInstance";

const wishlistApi = "/wishlist";

export const wishlistadd = createAsyncThunk(
  "products/wishlistadd",
  async (id: number, { rejectWithValue, getState }) => {
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

export const getWishlist = createAsyncThunk(
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

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    resetFavorites: (state) => {
      state.favoriteProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        const uniqueItems = action.payload.wishlistItems
          .filter(
            (item: any, index: number, self: any[]) =>
              index === self.findIndex((t) => t.product.id === item.product.id)
          )
          .map((item: any) => ({
            ...item.product,
            wishlistItemId: item.id,
          }));

        state.favoriteProducts = uniqueItems;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(wishlistadd.fulfilled, (state, action) => {
        const newFavorite = {
          ...action.payload.product,
          wishlistItemId: action.payload.id,
        };
        state.favoriteProducts.push(newFavorite);
      })
      .addCase(deleteWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(deleteWishlist.fulfilled, (state, action) => {
        const deletedId = action.payload.productId;
        state.favoriteProducts = state.favoriteProducts.filter(
          (p) => p.wishlistItemId?.toString() !== deletedId
        );
        state.isLoading = false;
      })
      .addCase(deleteWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
