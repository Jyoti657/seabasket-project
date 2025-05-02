import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductProps } from "../../types";
import { API } from "../../Api/axiosInstance";

// all the cart
const cartApi = "/cart";
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;
      const response = await API.get(`${cartApi}/get-cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// add cart

export const fetchCartAdd = createAsyncThunk(
  "cart/fetchCartAdd",
  async (id: number, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;
      const response = await API.post(
        `${cartApi}/add-to-cart`,
        {
          productId: id,
        },
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
    removeItem: (state, action: { payload: number }) => {
      const removeitemId = action.payload;
      state.productData = state.productData.filter(
        (item) => item.id !== Number(removeitemId)
      );
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
        state.productData = action.payload.cart.map((item: any) => ({
          ...item.product,
          quantity: item.quantity,
          cartID: item.id,
        }));
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
        const newProduct = action.payload.cartItem;

        if (newProduct && newProduct.product) {
          const productApi = {
            ...newProduct.product,

            quantity: newProduct.quantity,
            cartID: newProduct.id,
          };

          const existingIndex = state.productData.findIndex(
            (p) => p.id === newProduct.product.id
          );

          if (existingIndex !== -1) {
            state.productData[existingIndex].quantity = newProduct.quantity;
          } else {
            state.productData.push(productApi);
          }
        }
      })

      .addCase(fetchCartAdd.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add product to cart";
      });
  },
});

export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.productData.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0
  );

export const { resetCart, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
