import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../../types";
import axios from "axios";

const basic_URL = "https://fakestoreapi.com/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchproducts",
  async () => {
    try {
      const response = await axios.get(`${basic_URL}`);
      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }
);
export const fetchproductsDetails = createAsyncThunk(
  "products/fetchproductsDetails",
  async (id: string) => {
    try {
      const response = await axios.get(`${basic_URL}/${id}`);
      return response.data;
    } catch (e: any) {
      return e.message;
    }
  }
);

const initialState: ProductState = {
  allProducts: [],
  productsDetails: null,
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
      })
      //productsDetails
      .addCase(fetchproductsDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("pending");
      })
      .addCase(fetchproductsDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productsDetails = action.payload;
        console.log("loading");
      })
      .addCase(fetchproductsDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log("Error");
      });
  },
});

export const { setSearchQuery } = ProductSlice.actions;
export default ProductSlice.reducer;
