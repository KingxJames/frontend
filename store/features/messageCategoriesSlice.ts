import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IMessageCategory {
  id: number;
  category: string;
}

export interface MessageCategoryInitialState {
  messageCategories: IMessageCategory[];
}

const initialState: MessageCategoryInitialState = {
  messageCategories: [],
};

export const messageCategorySlice = createSlice({
  name: "messageCategories",
  initialState,
  reducers: {
    setMessageCategories: (state, action: PayloadAction<IMessageCategory[]>) => {
      return { ...state, messageCategories: action.payload };
    },

    addMessageCategories: (state, action: PayloadAction<IMessageCategory>) => {
      state.messageCategories.push(action.payload);
    },

    updateMessageCategories: (state, action: PayloadAction<IMessageCategory>) => {
      const index = state.messageCategories.findIndex(
        (messageCategory) => messageCategory.id === action.payload.id
      );
      if (index !== -1) {
        state.messageCategories[index] = {
          ...state.messageCategories[index],
          ...action.payload,
        };
      }
    },
    deleteMessageCategories: (state, action: PayloadAction<number>) => {
      state.messageCategories = state.messageCategories.filter(
        (messageCategories) => messageCategories.id !== action.payload
      );
    },
  },
});

export const {
  setMessageCategories,
  addMessageCategories,
  updateMessageCategories,
  deleteMessageCategories,
} = messageCategorySlice.actions;

export const selectMessageCategories = (state: RootState) =>  state.messageCategories;
export default messageCategorySlice.reducer;
