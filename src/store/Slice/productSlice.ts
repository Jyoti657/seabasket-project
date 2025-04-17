import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../../types";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchproducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: ProductState = {
  allProducts: [],
  filteredProducts: [],
  filters: {
    minPrice: 0,
    maxPrice: 1000,
    discount: 0,
    rating: 0,
  },
  sortBy: "",
  searchQuery: "",
  loading: false,
  error: null,
};
const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      const query = action.payload.toLowerCase();
      state.filteredProducts = state.allProducts.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log("fetch error ", action.payload);
      });
  },
});

export const { setSearchQuery } = ProductSlice.actions;
export default ProductSlice.reducer;
