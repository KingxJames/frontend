import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ISubMenus {
  id: number;
  icon: string;
  name: string;
  path: string;
  menuId: number;
}

export interface SubMenuInitialState {
  subMenus: ISubMenus[];
}

const initialState: SubMenuInitialState = {
  subMenus: [],
};

const subMenuSlice = createSlice({
  name: "subMenus",
  initialState,
  reducers: {
    setSubMenus: (state, action: PayloadAction<ISubMenus[]>) => {
      state.subMenus = action.payload;
    },

    addSubMenus: (state, action: PayloadAction<ISubMenus>) => {
      state.subMenus.push(action.payload); // Push new role directly into the array
    },

    updateSubMenus: (state, action: PayloadAction<ISubMenus>) => {
      const index = state.subMenus.findIndex(
        (subMenu) => subMenu.id === action.payload.id
      );
      if (index !== -1) {
        state.subMenus[index] = { ...state.subMenus[index], ...action.payload };
      }
    },
    deleteSubMenus: (state, action: PayloadAction<number>) => {
      state.subMenus = state.subMenus.filter(
        (subMenus) => subMenus.id !== action.payload
      );
    },
  },
});

export const {
  setSubMenus,
  addSubMenus,
  updateSubMenus,
  deleteSubMenus,
} = subMenuSlice.actions;

export const selectSubMenus = (state: RootState) => state.subMenus;
export default subMenuSlice.reducer;