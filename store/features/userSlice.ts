import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IUser {
  id: number;
  name: string;
  email: string;
  picture?: string;
  password: string;
  roleId: number;
  roles: string;
  userStatusId: number;
  userStatuses: string;
  campusId: number;
  campus: string;
  userCampusId: number;
  primaryCampus: boolean;
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

    updateProfilePicture: (
      state,
      action: PayloadAction<{ id: number; picture: string }>
    ) => {
      const user = state.users.find((user) => user.id === action.payload.id);
      if (user) {
        user.picture = action.payload.picture;
      }
    },
  },
});

export const { setUsers, addUsers, updateUsers, deleteUsers, updateProfilePicture } =
  userSlice.actions;
export const selectUsers = (state: RootState) => state.users;
export default userSlice.reducer;
