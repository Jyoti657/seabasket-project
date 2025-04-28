import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { filter, ProductState } from "../../types";
import axios from "axios";
import { API } from "../../Api/axiosInstance";

const productApi = "/product";

const basic_URL = "https://dummyjson.com/products";

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
// for the ProductsDetails
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
// for search products
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
// for filter Products
export const productFilter = createAsyncThunk(
  "products/productFilter",
  async (filter: filter, { rejectWithValue }) => {
    try {
      const response = await API.get(`${productApi}/filter-products`, {
        params: filter,
      });
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const productCategories = createAsyncThunk(
  "products/productsCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${basic_URL}/categories`);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

// for the products categories-list
export const productCategoriesList = createAsyncThunk(
  "products/productsCategoriesList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${basic_URL}/category-list`);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

// get products categories list
export const getproductCategoriesList = createAsyncThunk(
  "products/getproductCategoriesList",
  async (category: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${basic_URL}/category/${category}`);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

// sort products
export const sortProducts = createAsyncThunk(
  "products/sortProducts",
  async (sortBy: string, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const products = state.product.allProducts;
      const sorted = [...products];

      if (sortBy === "title") {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortBy === "price") {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sortBy === "rating") {
        sorted.sort((a, b) => b.rating - a.rating);
      }

      return sorted;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);
const initialState: ProductState = {
  allProducts: [],
  productsDetails: null,
  productSearch: null,
  filteredProducts: [],
  loading: false,
  error: null,
  searchQuery: "",
  productCategories: [],
  productCategoriesList: [],
  getProductCategoriesList: [],
  // sortProducts: [],
};
const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    // filterProducts: (state, action) => {
    //   const { priceRange, rating, discount, category } = action.payload;
    //   let filter = [...state.allProducts];
    //   if (priceRange) {
    //     filter = filter.filter(
    //       (product) =>
    //         product.price >= priceRange[0] && product.price <= priceRange[1]
    //     );
    //   }
    //   if (rating) {
    //     filter = filter.filter(
    //       (product) => product.rating && product.rating >= rating
    //     );
    //   }
    //   if (discount) {
    //     filter = filter.filter(
    //       (product) => product.discount && product.discount >= discount
    //     );
    //   }
    //   if (category) {
    //     filter = filter.filter((product) =>
    //       product.category.toLowerCase().includes(category.toLowerCase())
    //     );
    //   }

    //   state.filteredProducts = filter;
    // },
  },
  extraReducers: (builder) => {
    builder
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
      //productsDetails
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
      // for the search products
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
      // for the categories
      .addCase(productCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.productCategories = action.payload;
      })
      .addCase(productCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // for the categories-list
      .addCase(productCategoriesList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productCategoriesList.fulfilled, (state, action) => {
        state.loading = false;
        state.productCategoriesList = action.payload.products;
      })
      .addCase(productCategoriesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // for the get product categories list
      .addCase(getproductCategoriesList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getproductCategoriesList.fulfilled, (state, action) => {
        state.loading = false;
        state.getProductCategoriesList = action.payload.products;
      })
      .addCase(getproductCategoriesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // for the sort products
      .addCase(sortProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sortProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
      })
      .addCase(sortProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(productFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload.products;
      })
      .addCase(productFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery } = ProductSlice.actions;
export default ProductSlice.reducer;
