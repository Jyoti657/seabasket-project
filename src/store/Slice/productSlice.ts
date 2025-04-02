import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductState, StoreProduct } from "../../types";
// import { applyFilters,applySorting } from "../../util/productsUtils";

// callin the api
export const fetchProducts = createAsyncThunk(
  "products/fetchproducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error("Failed to fetch the products");
      const data: StoreProduct[] = await response.json();
      return data;
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
  loading: false,
  error: null,
};
const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // setPriceFilter:(state,action)=>{
    //   state.filters.minPrice=action.payload.minPrice;
    //   state.filters.maxPrice=action.payload.maxPrice;
    //   applyFilters(state);
    //   applySorting(state)
    // },
    // setRatingFilter:(state,action)=>{
    //   state.filters.rating=action.payload;
    //   applyFilters(state)
    //   applySorting(state)

    // },
    // setDiscountFilter:(state,action)=>{
    //   state.filters.discount=action.payload;
    //   applyFilters(state)
    //   applySorting(state)
    // },
    // sortProducts:(state,action)=>{
    //   state.sortBy=action.payload
    //   applySorting(state);
    // }
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
        // applyFilters(state)
        // applySorting(state)
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log("fetch error ", action.payload);
      });
  },
});

export const {} = ProductSlice.actions;
export default ProductSlice.reducer;
