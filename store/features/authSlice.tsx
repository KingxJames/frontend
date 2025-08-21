import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState {
  token: string | null;
  username: string;
  name: string;
  loading: boolean;
  error: string | null;
  isGoogleAuth?: boolean;
}

const initialState: AuthState = {
  token: null,
  username: "",
  name: "",
  loading: false,
  error: null,
  isGoogleAuth: false,
};

// Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<Partial<AuthState>>) {
      return { ...state, ...action.payload };
    },

    setGoogleAuthData(state, action: PayloadAction<any>) {
      return {
        ...state,
        token: action.payload.token,
        username: action.payload?.email || "",
        name: action.payload?.name || "",
        loading: false,
        error: null,
        isGoogleAuth: true,
      };
    },

    logout(state, action: PayloadAction<null>) {
      return {
        ...state,
        token: null,
        username: "",
        name: "",
        loading: false,
        error: null,
        isGoogleAuth: false,
      };
    },

    setToken(state, action: PayloadAction<string | null>) {
      return {
        ...state,
        token: action.payload,
      };
    },
  },
});

export const { setAuthData, setGoogleAuthData, logout, setToken } =
  authSlice.actions;

// export const

export default authSlice.reducer;

export const selectName = (state: RootState) => state.auth.name;
export const selectUsername = (state: RootState) => state.auth.username;
export const selectIsGoogleAuth = (state: RootState) => state.auth.isGoogleAuth;
export const selectToken = (state: RootState) => state.auth.token;
