import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IAuthState {
  user: {
    name: string;
    email: string;
    picture: string;
  } | null;
  token: string | null;
  isAuthenticated: boolean
}

const initialState: IAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

// Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<IAuthState>) {
      return { ...state, ...action.payload };
    },
    setUser: (state, action: PayloadAction<IAuthState['user']>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout(state) {
      return { ...state, user: null, token: null, isAuthenticated: false };  // Clear user and token on logout
    },
  },
});

export const { setAuthData, setUser, setToken, logout } = authSlice.actions;

// export const 

export default authSlice.reducer;


export const selectUser = (state: RootState) => state.auth.user;

