import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./../../store"; // Adjust the path according to your project structure

export interface IMessage {
  id: string;
  user: string | null;
  text: string;
  sender: string;
  timestamp: string;
}

export interface IChatListState {
  proPic: string;
  sender: string;
  previewText: string;
  isLoading: boolean;
  error: any;
}

export interface IChatState {
  messages: IMessage;
  chatList: IChatListState;
  activeUser: string | null;
  isEmojiPickerOpen: boolean;
  text: string;
  searchText: string;
}

const initialState: IChatState = {
  messages: {
    id: "",
    user: "",
    text: "",
    sender: "",
    timestamp: "",
  },
  chatList: {
    proPic: "",
    sender: "",
    previewText: "",
    isLoading: false,
    error: null,
  },
  activeUser: null,
  isEmojiPickerOpen: false,
  text: "",
  searchText: "",
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChatState: (state, action: PayloadAction<IChatState>) => {
      return { ...state, ...action.payload };
    },
    setMessage: (state, action: PayloadAction<Partial<IMessage>>) => {
      return {
        ...state,
        ...action.payload, // Create a new array with the existing messages and the new one
      };
    },

    setChatListState: (
      state,
      action: PayloadAction<Partial<IChatListState>>
    ) => {
      return { ...state, ...action.payload };
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
    setSearchText: (state, action: PayloadAction<string>) => {
      return { ...state, searchText: action.payload };
  },
}});


export const {
  setChatState,
  setMessage,
  setToggleEmojiPicker,
  setActiveUser,
  setText,
  setSearchText
} = chatSlice.actions;

export const selectChatState = (state: RootState) => {
  return state.chat;
};

export const selectToggleEmojiPicker = (state: RootState) =>
  state.chat.isEmojiPickerOpen;
export const selectActive = (state: RootState) => state.chat.activeUser;
export const selectText = (state: RootState) => state.chat.text;

export default chatSlice.reducer;
