import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductProps } from "../../types";
import axios from "axios";
const basic_URL = "https://dummyjson.com/carts";
// all the cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${basic_URL}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
// add cart

export const fetchCartAdd = createAsyncThunk(
  "cart/fetchCartAdd",
  async (product: ProductProps, thunkAPI) => {
    try {
      const response = await axios.post(`${basic_URL}/add`, {
        userId: 1,
        products: [
          {
            id: product.id,
            quantity: 1,
          },
        ],
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// update cart
export const fetchCartUpdate = createAsyncThunk(
  "cart/fetchCartUpdate",
  async (
    {
      cartId,
      updatedProduct,
    }: { cartId: number; updatedProduct: ProductProps },
    thunkAPI
  ) => {
    try {
      const response = await axios.put(`${basic_URL}/${cartId}`, {
        merge: true,
        products: [
          {
            id: updatedProduct.id,
            quantity: updatedProduct.quantity,
          },
        ],
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// delete cart
export const fetchCartDelete = createAsyncThunk(
  "cart/fetchCartDelete",
  async (cartId: number, thunkAPI) => {
    try {
      const response = await axios.delete(`${basic_URL}/${cartId}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
interface CartState {
  productData: ProductProps[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  productData: [],
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
  
    resetCart: (state) => {
      state.productData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && Array.isArray(action.payload.products)) {
          state.productData = action.payload.products;
        }
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart";
      })
      .addCase(fetchCartAdd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartAdd.fulfilled, (state, action) => {
        state.loading = false;
        const products = action.payload?.products;
        if (products && Array.isArray(products)) {
          state.productData.push(...products);
        }
      })
      .addCase(fetchCartAdd.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add product to cart";
      })
      // update cart
      .addCase(fetchCartUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartUpdate.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProducts = action.payload.products;

        if (Array.isArray(updatedProducts)) {
          updatedProducts.forEach((updatedProduct: ProductProps) => {
            const index = state.productData.findIndex(
              (p) => p.id === updatedProduct.id
            );
            if (index !== -1) {
              state.productData[index] = {
                ...state.productData[index],
                quantity: updatedProduct.quantity,
              };
            }
          });
        }
      })
      .addCase(fetchCartUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to update product to cart";
      })
      .addCase(fetchCartDelete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartDelete.fulfilled, (state, action) => {
        state.loading = false;
        const deletedProductId = action.payload.id;
        state.productData = state.productData.filter(
          (item) => item.id !== deletedProductId
        );
      })
      .addCase(fetchCartDelete.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to delete product from cart";
      });
  },
});

export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.productData.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0
  );

export const { resetCart } = cartSlice.actions;

export default cartSlice.reducer;
