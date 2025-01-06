import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState {
  token: string | null;
  username: string;
  name: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  username: "",
  name: "",
  isLoading: false,
  error: null,
};

// Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<Partial<AuthState>>) {
      return { ...state, ...action.payload };
    },
    logout(state) {
      return { ...state, token: null };
    },
  },
});

export const { setAuthData, logout } = authSlice.actions;

// export const

export default authSlice.reducer;

export const selectName = (state: RootState) => state.auth.name;
export const selectUsername = (state: RootState) => state.auth.username;
