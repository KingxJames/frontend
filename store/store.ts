import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./features/authSlice";
import dashboardReducer from "./features/dashboardSlice";
import  messagesReducer  from "./features/messageSlice";
import chatReducer from "./features/UBChat/chatSlice";
import listReducer from "./features/UBChat/listSlice"
import { baseAPI } from "./services/baseAPI";
import { authAPI } from "./services/authAPI";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    messages: messagesReducer,
    chat: chatReducer,
    list:listReducer,
    [baseAPI.reducerPath]: baseAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware, baseAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
