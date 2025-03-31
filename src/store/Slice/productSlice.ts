import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductProps } from "../../types";

// callin the api
export const fetchProducts = createAsyncThunk(
  "products/fetchproducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error("Failed to fetch the products");
      const data: ProductProps[] = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
interface ProductState {
  allProducts: ProductProps[];
  filteredProducts: ProductProps[];
  selectedProducts: ProductProps | null;
  searchQuery: string;
  loading: boolean;
  error: string | null;
}
const initialState: ProductState = {
  allProducts: [],
  filteredProducts: [],
  searchQuery: "",
  selectedProducts: null,
  loading: false,
  error: null,
};
const ProductSlice = createSlice({
  name: "products",
  initialState,

  // in this reducer we will create the reducer function for  1. soting and 2. filtering realted procuts

  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;

      state.filteredProducts = state.allProducts.filter((products) =>
        products.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setSelectedProduct:(state,action)=>{
      state.selectedProducts=action.payload
    }
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
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log("fetch error ", action.payload);
      });
  },
});
// exprt the action also  when we  will createing the reducer
export const { setSearchQuery } = ProductSlice.actions;
export default ProductSlice.reducer;
