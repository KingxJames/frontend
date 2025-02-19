import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phoneNo: string;
  organization: string;
  picture: string;
  domain: string;
  password: string;
  roleId: number;
  senderId: number;
}

export interface UserInitialState {
  users: IUser[];
}

const initialState: UserInitialState = {
  users: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      return { ...state, users: action.payload };
    },

    addUsers: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload); 
    },

    updateUsers: (state, action: PayloadAction<IUser>) => {
      const index = state.users.findIndex(
        (users) => users.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
      }
    },
    deleteUsers: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((users) => users.id !== action.payload);
    },
  },
});

export const { setUsers, addUsers, updateUsers, deleteUsers } = userSlice.actions;
export const selectUsers = ( state: RootState) => state.users;
export default userSlice.reducer;