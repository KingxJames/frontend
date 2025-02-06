import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Date } from "firebase/vertexai";

export interface IMessage {
  id: string;
  user: string;
  messag_category_id: number;
  sender_id: number;
  sender: string;
  topic: string;
  images: string;
  message: string;
  location: string;
  date_sent: Date;
  is_archive: boolean;
  is_deleted: boolean;
  is_forwarded: boolean;
  timestamp: string;
}

interface MessagesInitialState {
  messages: IMessage[];
}

const initialState: MessagesInitialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessages: (state, action: PayloadAction<IMessage>) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<IMessage[]>) => {
      state.messages = action.payload;
    },
    updateMessages: (state, action: PayloadAction<IMessage>) => {
      const index = state.messages.findIndex(
        (messages) => messages.id === action.payload.id
      );
      if (index !== -1) {
        state.messages[index] = { ...state.messages[index], ...action.payload };
      }
    },
    deleteMessages: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(
        (messages) => messages.id !== action.payload
      );
    },
  },
});

export const { addMessages, setMessages, updateMessages, deleteMessages } =
  messagesSlice.actions;
export const selectMessages = (state: RootState) => state.messages;
export default messagesSlice.reducer;
