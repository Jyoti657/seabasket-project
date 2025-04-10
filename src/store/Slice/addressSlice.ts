<<<<<<< HEAD
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
=======
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addressForm } from "../../types";

interface AddressState {
  list: addressForm[];
  isLoggedIn:boolean
}

const initialState: AddressState = {
  list: [],
  isLoggedIn:false
};
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddress:(state,action: PayloadAction<addressForm[]>) =>{
      state.list=action.payload;
      state.isLoggedIn=true
    }
    

  },
});
export const {setAddress} = addressSlice.actions;
export default addressSlice.reducer;
>>>>>>> be47cf3 (fix: resolve stash conflict and apply changes to profilepage)
