import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./Slices/authSlice";
import { vehicleSlice } from "./Slices/vehicleSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { serviceSlice } from "./Slices/serviceSlice";
import { mechanicSlice } from "./Slices/mechanicSlice";
import { requestSlice } from "./Slices/requestSlice";

const persistConfig = {
  key: "root",
  whitelist: ["auth"],
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  vehicle: vehicleSlice.reducer,
  service: serviceSlice.reducer,
  mechanic: mechanicSlice.reducer,
  request: requestSlice.reducer,
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
