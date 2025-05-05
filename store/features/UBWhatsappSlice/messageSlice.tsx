import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface IMessage {
  id: number;
  profilePic: string;
  sender: string;
  messageCategoryId: number;
  images: string;
  message: string;
  location: string;
  dateSent: string;
  isDeleted: boolean;
  type: string;
}

export interface MessagesInititalState {
  messages: IMessage[];
}

const initialState: MessagesInititalState = {
  messages: [],
}

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<IMessage[]>) => {
      return { ...state, messages: action.payload };
    },
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages.push(action.payload);
    },
    updateMessage: (state, action: PayloadAction<IMessage>) => {
      const index = state.messages.findIndex(
        (message) => message.dateSent === action.payload.dateSent
      );
      if (index !== -1) {
        state.messages[index] = {
          ...state.messages[index],
          ...action.payload,
        };
      }
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(
        (message) => message.dateSent !== action.payload
      );
    },
  },
});

// Action creators
export const {
  setMessages,
  addMessage,
  updateMessage,
  deleteMessage,
} = messageSlice.actions;

export const selectMessages = (state: RootState) => state.messages.messages;

export default messageSlice.reducer;
