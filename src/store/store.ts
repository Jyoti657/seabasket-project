  import { configureStore } from "@reduxjs/toolkit";
  import { persistStore, persistReducer } from "redux-persist";
  import storage from "redux-persist/lib/storage";
  import { combineReducers } from "redux";
  import cartReducer from "./Slice/cartSlice";
  import productReducer from "./Slice/productSlice";
  import favoriteReducer from "./Slice/favoriteSlice";
  import addressReducer from "./Slice/addressSlice";
  import authReducer from "./Slice/authSlice";
  import orderReducer from "./Slice/orderSlice"

  const persistConfig = {
    key: "root",
    storage,
    whitelist: ["product", "cart", "favorites", "address","auth","order"], 
  };

  const rootReducer = combineReducers({
    product: productReducer,
    cart: cartReducer,
    favorites: favoriteReducer,
    address: addressReducer,
    auth: authReducer,
    order:orderReducer
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  export const persistor = persistStore(store);

  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
