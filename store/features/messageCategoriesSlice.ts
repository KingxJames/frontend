import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IMessageCategory {
  id: number;
  category: string;
}

export interface MessageCategoryInitialState {
  messageCategory: IMessageCategory[];
}

const initialState: MessageCategoryInitialState = {
  messageCategory: [],
};

const messageCategorySlice = createSlice({
  name: "messageCategory",
  initialState,
  reducers: {
    setMessageCategory: (state, action: PayloadAction<IMessageCategory[]>) => {
      return { ...state, messageCategory: action.payload };
    },

    addMessageCategory: (state, action: PayloadAction<IMessageCategory>) => {
      state.messageCategory.push(action.payload); 
    },

    updateMessageCategory: (state, action: PayloadAction<IMessageCategory>) => {
      const index = state.messageCategory.findIndex(
        (messageCategory) => messageCategory.id === action.payload.id
      );
      if (index !== -1) {
        state.messageCategory[index] = {
          ...state.messageCategory[index],
          ...action.payload,
        };
      }
    },
    deleteMessageCategory: (state, action: PayloadAction<number>) => {
      state.messageCategory = state.messageCategory.filter(
        (messageCategory) => messageCategory.id !== action.payload
      );
    },
  },
});

export const { setMessageCategory, addMessageCategory, updateMessageCategory, deleteMessageCategory } =
messageCategorySlice.actions;
export const selectMessageCategorySlice = (state: RootState) => state.messageCategory;
export default messageCategorySlice.reducer;
