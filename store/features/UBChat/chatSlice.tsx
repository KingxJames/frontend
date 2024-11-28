import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  messages: {
    user: string | null; id: string; text: string; sender: string; timestamp: string 
}[];
  activeUser: string | null;
  isEmojiPickerOpen: boolean;
}

const initialState: ChatState = {
  messages: [],
  activeUser: null,
  isEmojiPickerOpen: false,
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<any>) => {
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