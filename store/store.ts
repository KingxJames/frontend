import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { PersistGate } from 'redux-persist/integration/react';
import authReducer from "./features/authSlice";
import dashboardReducer from "./features/dashboardSlice";
import  messagesReducer  from "./features/messageSlice";
import chatReducer from "./features/UBChat/chatSlice";
import listReducer from "./features/UBChat/listSlice"
import rolesReducer from "./features/roleSlice";
import { baseAPI } from "./services/baseAPI";
import { authAPI } from "./services/authAPI";
import { chatAPI } from "./services/chatAPI";

// Configuration for persisting chatReducer
const persistConfig = {
  key: "chat",
  storage,
};

// Wrap chatReducer with persistReducer
const persistedChatReducer = persistReducer(persistConfig, chatReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    messages: messagesReducer,
    chat: persistedChatReducer, // Use persisted reducer here
    list: listReducer,
    roles: rolesReducer,
    [baseAPI.reducerPath]: baseAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serialization checks for persist
    }).concat(authAPI.middleware, baseAPI.middleware, chatAPI.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
