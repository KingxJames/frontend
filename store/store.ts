import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import authReducer from "./features/authSlice";
import dashboardReducer from "./features/dashboardSlice";
import messagesReducer from "./features/UBWhatsappSlice/messageSlice";
import buildingsReducer from "./features/buildingSlice";
import campusesReducer from "./features/campusSlice";
import departmentsReducers from "./features/departmentSlice";
import messageCategoryReducer from "./features/messageCategoriesSlice";
import departmentMemberReducer from "./features/departmentMemberSlice";
import incidentStatusReducer from "./features/incidentStatusSlice";
import incidentReportReducer from "./features/incidentReportSlice";
import incidentTypesReducer from "./features/incidentTypeSlice";
import menuReducer from "./features/menuSlice";
import usersReducer from "./features/userSlice";
import recipientReducer from "./features/recipientSlice";
import subMenuReducer from "./features/subMenusSlice";
import userCampusesReducer from "./features/userCampusSlice";
import userStatusesReducer from "./features/userStatusSlice";
import EndOfShiftReportPatrolReducer from "../store/features/endOfShiftReportPatrolSlice";
import { baseAPI } from "./services/baseAPI";
import { authAPI } from "./services/authAPI";
import { chatAPI } from "./services/chatAPI";

const authPersistConfig = {
  key: "auth",
  storage: sessionStorage, // Uses sessionStorage for auth (clears when tab closes)
  whitelist: ["user", "token", "username", "name"], // Only persist these fields from auth reducer
};

const messagesPersistConfig = {
  key: "messages",
  storage, // Uses localStorage for messages
  whitelist: ["messages", "sharedImages"], // Only persist the messages array
};

const incidentReportPersistConfig = {
  key: "incidentReports",
  storage, // Uses localStorage for incidentReports
  whitelist: [
    "id",
    "caseNumber",
    "date",
    "time",
    "buildingName",
    "campus",
    "incidentType",
    "incidentReportStatus",
    "description",
    "action",
    "contact",
    "uploadedBy",
    "reportedBy",
    "witnesses",
    "formSubmitted",
    "incidentFiles",
  ], // Only persist the incidentReports array
};

export const endOfShiftReportPatrolPersistConfig = {
  key: "endOfShiftReportPatrol",
  storage, // Uses localStorage for endOfShiftReportPatrol
  whitelist: ["id", "date", "time", "campus", "report", "uploadedBy"], // Only persist the endOfShiftReportPatrol array
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  messages: persistReducer(messagesPersistConfig, messagesReducer),
  dashboard: dashboardReducer,
  buildings: buildingsReducer,
  campus: campusesReducer,
  departments: departmentsReducers,
  messageCategories: messageCategoryReducer,
  users: usersReducer,
  departmentMembers: departmentMemberReducer,
  incidentReports: persistReducer(
    incidentReportPersistConfig,
    incidentReportReducer
  ),
  endOfShiftReportPatrol: persistReducer(
    endOfShiftReportPatrolPersistConfig,
    EndOfShiftReportPatrolReducer
  ),
  incidentStatus: incidentStatusReducer,
  incidentTypes: incidentTypesReducer,
  menu: menuReducer,
  recipients: recipientReducer,
  subMenus: subMenuReducer,
  userCampuses: userCampusesReducer,
  userStatuses: userStatusesReducer,
  [baseAPI.reducerPath]: baseAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseAPI.middleware, authAPI.middleware, chatAPI.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
