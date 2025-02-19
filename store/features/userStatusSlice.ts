import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IUserStatus {
  id: number;
  userStatuses: string;
}

export interface UserStatusInitialState {
  userStatuses: IUserStatus[];
}

const initialState: UserStatusInitialState = {
  userStatuses: [],
};

export const userStatusSlice = createSlice({
  name: "userStatuses",
  initialState,
  reducers: {
    setUserStatuses: (state, action: PayloadAction<IUserStatus[]>) => {
      return { ...state, userStatuses: action.payload };
    },

    addUserStatuses: (state, action: PayloadAction<IUserStatus>) => {
      state.userStatuses.push(action.payload); // Push new role directly into the array
    },

    updateUserStatuses: (state, action: PayloadAction<IUserStatus>) => {
      const index = state.userStatuses.findIndex(
        (userStatus) => userStatus.id === action.payload.id
      );
      if (index !== -1) {
        state.userStatuses[index] = {
          ...state.userStatuses[index],
          ...action.payload,
        };
      }
    },
    deleteUserStatuses: (state, action: PayloadAction<number>) => {
      state.userStatuses = state.userStatuses.filter(
        (userStatuses) => userStatuses.id !== action.payload
      );
    },
  },
});

export const {
  setUserStatuses,
  addUserStatuses,
  updateUserStatuses,
  deleteUserStatuses,
} = userStatusSlice.actions;


export const selectUserStatuses = ( state: RootState) => state.userStatuses;
export default userStatusSlice.reducer