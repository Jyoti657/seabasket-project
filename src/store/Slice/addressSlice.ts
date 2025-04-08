  import { createSlice } from "@reduxjs/toolkit";
  import { addressForm } from "../../types";

  interface AddressState {
    list:addressForm[];
    toggleform?:boolean;
    todoUpdateForm?:Partial<addressForm>|null
  }

  const initialState: AddressState = {
    list:[],
    toggleform:false,
    todoUpdateForm:null
    
  };
  const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
      
  }
  });
  export const {} =
    addressSlice.actions;
  export default addressSlice.reducer;
