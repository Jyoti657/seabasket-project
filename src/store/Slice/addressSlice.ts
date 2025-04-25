import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addressSchemaType } from "../../schema/addressSchema";
import { addressForm } from "../../types";
import {API} from "../../Api/axiosInstance"




const addressApi='/address'

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (addressData: addressSchemaType, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;
      const response = await API.post(`${addressApi}/add-address`, addressData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async (userId: string, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;

      const response = await API.get(`${addressApi}/get-address/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

interface AddressState {
  list:addressForm[];
  isLoading: boolean;
  error: string | null;
  userId:string
}

const initialState: AddressState = {
  list: [],
  isLoading: false,
  error: null,
  userId:""
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
        console.log("Fetched payload:", action.payload); 
      
        if (action.payload?.list && action.payload?.userId) {
          state.list = action.payload.list;
          state.userId = action.payload.userId;
        } else {
          state.error = "Invalid response format from server";
        }
      })
      
      .addCase(fetchAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
export const {} = addressSlice.actions;
export default addressSlice.reducer;
