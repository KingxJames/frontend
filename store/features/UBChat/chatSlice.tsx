import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./../../store"; // Adjust the path according to your project structure

export interface IMessage {
  id: string;
  user: string | null;
  text: string;
  sender: string;
  timestamp: string;
}

export interface IChatState {
  messages: IMessage[];
  activeUser: string | null;
  isEmojiPickerOpen: boolean;
  text: string;
}

const initialState: IChatState = {
  messages: [],
  activeUser: null,
  isEmojiPickerOpen: false,
  text: "",
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChatState: (state, action: PayloadAction<IChatState>) => {
      return { ...state, ...action.payload };
    },
    addMessage: (state, action: PayloadAction<IMessage>) => {
      return {
        ...state,
        messages: [...state.messages, action.payload], // Create a new array with the existing messages and the new one
      };
    },
    setToggleEmojiPicker: (state) => {
      state.isEmojiPickerOpen = !state.isEmojiPickerOpen;
    },
    setActiveUser: (state, action: PayloadAction<string>) => {
      state.activeUser = action.payload;
    },
    setText: (state, action: PayloadAction<string>) => {
      return { ...state, text: action.payload };
    },
  },
});

export const {
  setChatState,
  addMessage,
  setToggleEmojiPicker,
  setActiveUser,
  setText,
} = chatSlice.actions;

export const selectChatState = (state: RootState) => state.chat;
export const selectToggleEmojiPicker = (state: RootState) =>
  state.chat.isEmojiPickerOpen;
export const selectActive = (state: RootState) => state.chat.activeUser;
export const selectText = (state: RootState) => state.chat.text;

export default chatSlice.reducer;
