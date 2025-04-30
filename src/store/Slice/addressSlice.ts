import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addressSchemaType } from "../../schema/addressSchema";
import { addressForm } from "../../types";
import { API } from "../../Api/axiosInstance";

const addressApi = "/address";

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (addressData: addressSchemaType, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;
      const response = await API.post(
        `${addressApi}/add-address`,
        addressData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;
      const response = await API.get(`${addressApi}/get-address/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched address data:", response.data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async (
    { id, updateaddress }: { id: string; updateaddress: addressSchemaType },
    { getState, rejectWithValue }
  ) => {
    try {
      const state: any = getState();
      const token = state.auth.token;
      const response = await API.put(
        `${addressApi}/update-address/${id}`,
        updateaddress,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;
      await API.delete(`${addressApi}/delete-address/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

interface AddressState {
  list: addressForm[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AddressState = {
  list: [],
  isLoading: false,
  error: null,
};
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload) {
          state.list.push(action.payload.address);
        }
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload.address;
      })

      .addCase(fetchAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        console.error("Error fetching address:", action.payload);
      })
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload.updateAddress;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        console.error("Error");
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        const deleteAddressId = action.payload;
        state.list = state.list.filter(
          (address) => address.id !== deleteAddressId
        );
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        console.error("Error");
      });
  },
});
export const {} = addressSlice.actions;
export default addressSlice.reducer;
