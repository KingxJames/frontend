import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

export interface AuthState {
  token: string | null;
  username: string;
  name: string;
  isLoading: boolean;
  error: string | null;
  users: User[];
}

const initialState: AuthState = {
  token: null,
  username: "",
  name: "",
  isLoading: false,
  error: null,
  users: [
    {
      id: "",
      name: "",
      email: "",
      picture: "",
    },
  ],
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
export const selectUsers = (state: RootState) => state.auth.users;
