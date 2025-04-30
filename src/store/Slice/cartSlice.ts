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
        state.productData.push = action.payload.products;
        // if (products && Array.isArray(products)) {
        //   state.productData.push(...products);
        // }
      })
      .addCase(fetchCartAdd.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add product to cart";
      });
    // update cart
    //       .addCase(fetchCartUpdate.pending, (state) => {
    //         state.error = null;
    //       })
    //       .addCase(fetchCartUpdate.fulfilled, (state, action) => {
    //         const updatedProducts = action.payload.products;

    //         if (Array.isArray(updatedProducts)) {
    //           updatedProducts.forEach((updatedProduct: ProductProps) => {
    //             const index = state.productData.findIndex(
    //               (p) => p.id === updatedProduct.id
    //             );
    //             if (index !== -1) {
    //               state.productData[index] = {
    //                 ...state.productData[index],
    //                 quantity: updatedProduct.quantity,
    //               };
    //             }
    //           });
    //         }
    //       })
    //       .addCase(fetchCartUpdate.rejected, (state, action) => {
    //         state.loading = false;
    //         state.error =
    //           action.error.message || "Failed to update product to cart";
    //       })
    //       .addCase(fetchCartDelete.pending, (state) => {
    //         state.error = null;
    //       })
    //       .addCase(fetchCartDelete.fulfilled, (state, action) => {
    //         state.loading = false;
    //         const deletedProductId = action.payload.id;
    //         state.productData = state.productData.filter(
    //           (item) => item.id !== deletedProductId
    //         );
    //       })
    //       .addCase(fetchCartDelete.rejected, (state, action) => {
    //         state.loading = false;
    //         state.error =
    //           action.error.message || "Failed to delete product from cart";
    //       });
    //
    //
  },
});

export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.productData.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0
  );

export const { resetCart } = cartSlice.actions;

export default cartSlice.reducer;
