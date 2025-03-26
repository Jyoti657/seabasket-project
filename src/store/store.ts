import { configureStore } from "@reduxjs/toolkit";

import { slice } from "./slice";

export const store = configureStore({
  reducer: {
    slice: slice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
