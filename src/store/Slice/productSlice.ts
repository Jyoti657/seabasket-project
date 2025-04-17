import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductProps, ProductState } from "../../types";
import axios from "axios";

const basic_URL = "https://dummyjson.com/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchproducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${basic_URL}`);
      return response.data.products;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
// for the ProductsDetails
export const fetchproductsDetails = createAsyncThunk(
  "products/fetchproductsDetails",
  async (id: string): Promise<ProductProps> => {
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
  loading: false,
  error: null,
};
const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
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
      })
      .addCase(fetchproductsDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productsDetails = action.payload;
      })
      .addCase(fetchproductsDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {} = ProductSlice.actions;
export default ProductSlice.reducer;
