import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";

export interface FilePreview {
  id: string;
  url: string;
  name: string;
  type: "image";
}

export interface Message {
  id: string;
  chatId: string;
  sender: string;
  text: string;
  files: FilePreview[] | null;
  timestamp: number;
}

export interface MessagesState {
  searchQuery: string;
  showSearchBar: boolean;
  filePreviews: FilePreview[];
  currentMessageText: string;
  showEmojiPicker: boolean;
  // Removed messages and sharedImages from state since they'll be managed by RTK Query
}

const initialState: MessagesState = {
  searchQuery: "",
  showSearchBar: false,
  filePreviews: [],
  currentMessageText: "",
  showEmojiPicker: false,
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleSearchBar: (state) => {
      state.showSearchBar = !state.showSearchBar;
    },
    addFilePreviews: (state, action: PayloadAction<FilePreview[]>) => {
      state.filePreviews.push(
        ...action.payload.filter((file) => file.type === "image")
      );
    },
    removeFilePreview: (state, action: PayloadAction<string>) => {
      state.filePreviews = state.filePreviews.filter(
        (file) => file.id !== action.payload
      );
    },
    clearFilePreviews: (state) => {
      state.filePreviews = [];
    },
    setCurrentMessageText: (state, action: PayloadAction<string>) => {
      state.currentMessageText = action.payload;
    },
    toggleEmojiPicker: (state) => {
      state.showEmojiPicker = !state.showEmojiPicker;
    },
    addEmoji: (state, action: PayloadAction<string>) => {
      state.currentMessageText += action.payload;
    },
    // Removed data-related actions since they'll be handled by RTK Query
  },
});

// Action creators
export const {
  setSearchQuery,
  toggleSearchBar,
  addFilePreviews,
  removeFilePreview,
  clearFilePreviews,
  setCurrentMessageText,
  toggleEmojiPicker,
  addEmoji,
} = messageSlice.actions;

// Selectors (only for UI state now)
export const selectFilePreviews = (state: RootState) =>
  state.messages.filePreviews;
export const selectCurrentMessageText = (state: RootState) =>
  state.messages.currentMessageText;
export const selectShowSearchBar = (state: RootState) =>
  state.messages.showSearchBar;
export const selectShowEmojiPicker = (state: RootState) =>
  state.messages.showEmojiPicker;
export const selectSearchQuery = (state: RootState) =>
  state.messages.searchQuery;
export const selectSharedImagesByChatId = (state: RootState, chatId: string) =>
  state.messages.filePreviews.filter((file) => file.id === chatId);

export default messageSlice.reducer;
