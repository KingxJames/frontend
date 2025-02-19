import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IUserCampus {
  id: number;
  userId: number;
  campusId: number;
  primaryCampus: boolean;
}

export interface UserCampusInitialState {
     userCampuses: IUserCampus[]
}

const initialState: UserCampusInitialState = {
    userCampuses: [],
}

export const userCampusSlice = createSlice({
    name: "userCampuses",
    initialState,
    reducers: {
        setUserCampuses: (state, action: PayloadAction<IUserCampus[]>) => {
          return { ...state, userCampuses: action.payload };
        },
    
        addUserCampuses: (state, action: PayloadAction<IUserCampus>) => {
          state.userCampuses.push(action.payload); // Push new role directly into the array
        },
    
        updateUserCampuses: (state, action: PayloadAction<IUserCampus>) => {
          const index = state.userCampuses.findIndex(
            (userCampus) => userCampus.id === action.payload.id
          );
          if (index !== -1) {
            state.userCampuses[index] = { ...state.userCampuses[index], ...action.payload };
          }
        },
        deleteUserCampuses: (state, action: PayloadAction<number>) => {
          state.userCampuses = state.userCampuses.filter((userCampuses) => userCampuses.id !== action.payload);
        },
      },
})

export const { setUserCampuses, addUserCampuses, updateUserCampuses, deleteUserCampuses} = userCampusSlice.actions;
export const selectUserCampuses = ( state: RootState) => state.userCampuses;
export default userCampusSlice.reducer;