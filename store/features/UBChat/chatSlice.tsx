import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./../../store";

export interface Message {
    id: string;
    text?: string;
    image?: string;
    file?: { name: string; url: string };
    sender: "user" | "own";
    timestamp: string;
  }
  
  export interface ChatState {
    messages: Message[];
    activeUser: string;
    isEmojiPickerOpen: boolean;
  }
  
  const initialState: ChatState = {
    messages: [],
    activeUser: "James Faber",
    isEmojiPickerOpen: false,
  };
  
  const chatSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
      addMessage: (state, action: PayloadAction<Message>) => {
        state.messages.push(action.payload);
      },
      setToggleEmojiPicker: (state) => {
        state.isEmojiPickerOpen = !state.isEmojiPickerOpen;
      },
      setActiveUser: (state, action: PayloadAction<string>) => {
        state.activeUser = action.payload;
      },
    },
  });

  export const { addMessage, setToggleEmojiPicker, setActiveUser } = chatSlice.actions;
  
  export default chatSlice.reducer;