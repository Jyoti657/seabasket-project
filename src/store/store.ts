import { configureStore } from "@reduxjs/toolkit";
// import authRedcer from "./Slice/authSlice"

import cartReducer from "./Slice/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
