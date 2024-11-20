import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IAuthState {
  user: {
    name: string;
    email: string;
    picture: string;
  } | null;
  token: string | null;
  personalEmail: string | null;
  phoneNumber: string | null;
  isAuthenticated: boolean
}

const initialState: IAuthState = {
  user: null,
  token: null,
  personalEmail: null,
  phoneNumber: null,
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
      state.personalEmail = "";
      state.isAuthenticated = true;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setPersonalEmail: (state, action: PayloadAction<string>) => {
      state.personalEmail = action.payload;
    },
    logout(state) {
      return { ...state, user: null, token: null, isAuthenticated: false };  
    },
  },
});

export const { setAuthData, setUser, setToken, setPhoneNumber, setPersonalEmail, logout } = authSlice.actions;

// export const 

export default authSlice.reducer;


export const selectUser = (state: RootState) => state.auth.user;
export const selectPhoneNumber = (state: RootState) => state.auth.phoneNumber;

