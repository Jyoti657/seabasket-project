
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import cartReducer from "./Slice/cartSlice";
import productReducer from "./Slice/productSlice";
import favoriteReducer from "./Slice/favoriteSlice"
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["product", "cart","favorite"], // Persist both slices
};

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  favorites:favoriteReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Avoid warnings for non-serializable values
    }),
});

export const persistor = persistStore(store);

// Type Definitions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
