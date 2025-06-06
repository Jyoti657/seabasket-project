import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../../types";
import { API } from "../../Api/axiosInstance";

const productApi = "/product";

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchproducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(`${productApi}/get-products`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch product details
export const fetchproductsDetails = createAsyncThunk(
  "products/fetchproductsDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await API.get(`${productApi}/get-product/${id}`);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

// Search products
export const productSearch = createAsyncThunk(
  "products/productSearch",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await API.get(`${productApi}/search-product`, {
        params: { name: query },
      });
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

// Filter products
export const productFilter = createAsyncThunk(
  "products/productFilter",
  async (
    {
      category,
      minprice,
      maxprice,
      minDiscount,
      maxDiscount,
      sort,
    }: {
      category?: string;
      minprice?: number;
      maxprice?: number;
      minDiscount?: number;
      maxDiscount?: number;
      sort?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await API.get(`${productApi}/filter-products`, {
        params: {
          category,
          minPrice: minprice,
          maxPrice: maxprice,
          minDiscount,
          maxDiscount,
          sort,
        },
      });
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

// Get categories
export const productCategories = createAsyncThunk(
  "products/productsCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(`category/get-categories`);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

// Trending products
export const trendingProducts = createAsyncThunk(
  "products/trendingProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(`${productApi}/trending-products`);
      const reviews = response.data.trendingProducts;

      const productPromises = reviews.map((review: any) =>
        API.get(`${productApi}/get-product/${review.productId}`)
      );

      const productResponses = await Promise.all(productPromises);
      const trendingProducts = productResponses.map((res) => res.data.product);

      return trendingProducts;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState: ProductState = {
  allProducts: [],
  productsDetails: null,
  productSearch: null,
  loading: false,
  error: null,
  searchQuery: "",
  productCategories: [],
  productCategoriesList: [],
};

// Slice
const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload.product;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Product details
      .addCase(fetchproductsDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchproductsDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productsDetails = action.payload.product;
      })
      .addCase(fetchproductsDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Search
      .addCase(productSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.productSearch = action.payload.products;
      })
      .addCase(productSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Filter
      .addCase(productFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload?.products || [];
      })
      .addCase(productFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Categories
      .addCase(productCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.productCategories = action.payload.categories || [];
      })
      .addCase(productCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Trending
      .addCase(trendingProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(trendingProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
      })
      .addCase(trendingProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery } = ProductSlice.actions;
export default ProductSlice.reducer;
