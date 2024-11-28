import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IAuthState {
  user: {
    name: string;
    email: string;
    picture: string;
  } | null;
  id_token: string | null;
  loading: boolean;
  error: string | null;
  personalEmail: string | null;
  phoneNumber: string | null;
  isAuthenticated: boolean;
  users: Array<{ name: string; email: string; picture: string }>;

}

const initialState: IAuthState = {
  user: null,
  id_token: null,
  loading: false,
  error: null,
  personalEmail: null,
  phoneNumber: null,
  isAuthenticated: false,
  users: [],
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
    setUsers: (state, action: PayloadAction<IAuthState["users"]>) => {
      state.users = action.payload;
    },
    setIDToken: (state, action: PayloadAction<string>) => {
      state.id_token = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setPersonalEmail: (state, action: PayloadAction<string>) => {
      state.personalEmail = action.payload;
    },
    logout(state) {
      return { ...state, user: null, id_token: null, isAuthenticated: false, users: [] };  
    },
  },
});

export const { setAuthData, setUser, setUsers, setIDToken, setPhoneNumber, setPersonalEmail, logout } = authSlice.actions;

// export const 

export default authSlice.reducer;


export const selectUser = (state: RootState) => state.auth.user;
export const selectUsers = (state: RootState) => state.auth.users;
export const selectIDToken = (state: RootState) => state.auth.id_token;
export const selectPhoneNumber = (state: RootState) => state.auth.phoneNumber;

