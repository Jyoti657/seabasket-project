// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { ProductProps } from "../types";
// import { StoreProduct } from "../types";

// const  item= localStorage.getItem('productData')!== null?JSON.parse(localStorage.getItem('productData')):[]

// // thunk fetch products
// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch("https://fakestoreapi.com/products");
//       if (!response.ok) throw new Error("Failed to fetch the products");
//       const data: ProductProps[] = await response.json();
//       return data;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
// interface stateSlice {
//   productData: StoreProduct[];
//   favoritData: StoreProduct[];
//   allProducts: StoreProduct[];
//   userInfo: [] | null | string;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: stateSlice = {
//   productData: [],
//   favoritData: [],
//   allProducts: [],
//   userInfo: null,
//   loading: false,
//   error: null,
// };

// export const slice = createSlice({
//   name: "slice",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const existingProduct = state.productData.find(
//         (item: StoreProduct) => item.id === action.payload.id
//       );
//       if (existingProduct) {
//         existingProduct.quantity += 1;
//       } else {
//         state.productData.push({ ...action.payload, quantity: 1 });
//       }
//       console.log(action.payload, "item is added to cart");
//       localStorage.setItem('cartItem',JSON.stringify(state.productData.map((item => item))))
//     },
//     addToFavorite: (state, action) => {
//       const existingProduct = state.productData.find(
//         (item: StoreProduct) => item.id === action.payload.id
//       );

//       if (existingProduct) {
//         existingProduct.quantity += 1;
//       } else {
//         state.favoritData.push({ ...action.payload, quantity: 1 });
//       }
//       console.log(action.payload, "item is added  to favorite");
//     },
//     increaseQuantity: (state, action) => {
//       const existingProduct = state.productData.find(
//         (item: StoreProduct) => item.id === action.payload.id
//       );
//       existingProduct && existingProduct.quantity++;
//     },
//     decreaseQuantity: (state, action) => {
//       const existingProduct = state.productData.find(
//         (item: StoreProduct) => item.id === action.payload.id
//       );
//       if (existingProduct?.quantity === 1) {
//         existingProduct.quantity = 1;
//       } else {
//         existingProduct!.quantity--;
//       }
//     },
//     deleteProduct: (state, action) => {
//       state.productData = state.productData.filter(
//         (item) => item.id !== action.payload
//       );
//     },
//     resetCart: (state) => {
//       state.productData = [];
//     },
//     adduser: (state, action) => {
//       state.userInfo = action.payload;
//       localStorage.setItem("userInfo",JSON.stringify(action.payload))
//     },
//     removeUser: (state, action) => {
//       state.userInfo = null;
//     },
//     setAllProducts: (state, action) => {
//       state.allProducts = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.allProducts = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const {
//   addToCart,
//   addToFavorite,
//   increaseQuantity,
//   decreaseQuantity,
//   deleteProduct,
//   resetCart,
//   adduser,
//   removeUser,
//   setAllProducts,
// } = slice.actions;
// export default slice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductProps, StoreProduct } from "../../types";

// Utility function to load cart data safely
const loadCartItems = (): StoreProduct[] => {
  try {
    const storedCart = localStorage.getItem("cartItem");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Error loading cart data:", error);
    return [];
  }
};

// Fetch products async thunk
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
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

interface StateSlice {
  productData: StoreProduct[];
  favoritData: StoreProduct[];
  allProducts: ProductProps[];
  userInfo: [] | null | string;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: StateSlice = {
  productData: loadCartItems(), // Load cart from localStorage
  favoritData: [],
  allProducts: [],
  userInfo: JSON.parse(localStorage.getItem("userInfo") || "null"), // Load user info
  loading: false,
  error: null,
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.productData.find(
        (item: StoreProduct) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.productData.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cartItem", JSON.stringify(state.productData));
    },
    addToFavorite: (state, action) => {
      const existingProduct = state.favoritData.find(
        (item: StoreProduct) => item.id === action.payload.id
      );
      if (!existingProduct) {
        state.favoritData.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: StoreProduct) => item.id === action.payload.id
      );
      if (existingProduct) existingProduct.quantity++;
      localStorage.setItem("cartItem", JSON.stringify(state.productData));
    },
    decreaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: StoreProduct) => item.id === action.payload.id
      );
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity--;
      }
      localStorage.setItem("cartItem", JSON.stringify(state.productData));
    },
    deleteProduct: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cartItem", JSON.stringify(state.productData));
    },
    resetCart: (state) => {
      state.productData = [];
      localStorage.removeItem("cartItem");
    },
    addUser: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    removeUser: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
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
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addToCart, addToFavorite, increaseQuantity, decreaseQuantity, deleteProduct, resetCart, addUser, removeUser, setAllProducts } = cart.actions;
export default cart.reducer;
