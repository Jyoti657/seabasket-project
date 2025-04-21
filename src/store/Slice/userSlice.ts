import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { profileSchemaType } from "../../schema/ProfileSchema";
import axios from "axios";

export const userProfile = createAsyncThunk(
  "user/userProfile",
  async (
    userId: number,
    { rejectWithValue }: { rejectWithValue: (value: any) => void }
  ) => {
    try {
      const response = await axios.get(`https://dummyjson.com/users/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
const initialState: profileSchemaType = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};
const useSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userProfile.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });

    builder.addCase(userProfile.rejected, (state, action) => {
      console.error("Error fetching user profile:", action.payload);
    });
  },
});
export const { updateProfile } = useSlice.actions;
export default useSlice.reducer;
