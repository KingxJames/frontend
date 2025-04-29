import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";

interface FilePreview {
  id: string;
  url: string;
  name: string;
  type: "image"; // Only 'image' type now
}

interface Message {
  id: string;
  chatId: string;
  sender: string;
  text: string;
  files: FilePreview[] | null;
  timestamp: number;
}

interface MessagesState {
  messages: Record<string, Message[]>;
  searchQuery: string;
  showSearchBar: boolean;
  filePreviews: FilePreview[];
  currentMessageText: string;
  showEmojiPicker: boolean;
  sharedImages: Record<string, Array<{ src: string; alt: string }>>; // Key is chatId
}

const initialState: MessagesState = {
  messages: {},
  searchQuery: "",
  showSearchBar: false,
  filePreviews: [],
  currentMessageText: "",
  showEmojiPicker: false,
  sharedImages: {},
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<Omit<Message, "id" | "timestamp">>
    ) => {
      const { chatId } = action.payload;
      const newMessage: Message = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
      };

      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }

      state.messages[chatId].push(newMessage);
      state.currentMessageText = "";
      state.filePreviews = [];
    },

    addFilePreviews: (state, action: PayloadAction<FilePreview[]>) => {
      // Only add images (though the type should enforce this already)
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

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    toggleSearchBar: (state) => {
      state.showSearchBar = !state.showSearchBar;
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

    initializeChat: (state, action: PayloadAction<string>) => {
      const chatId = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
    },

    clearChatMessages: (state, action: PayloadAction<string>) => {
      const chatId = action.payload;
      if (state.messages[chatId]) {
        state.messages[chatId] = [];
      }
    },

    addSharedImage: (
      state,
      action: PayloadAction<{
        chatId: string;
        image: { src: string; alt: string };
      }>
    ) => {
      const { chatId, image } = action.payload;
      if (!state.sharedImages[chatId]) {
        state.sharedImages[chatId] = [];
      }
      state.sharedImages[chatId].push(image);
    },
  },
});

// Action creators
export const {
  addMessage,
  addFilePreviews,
  removeFilePreview,
  clearFilePreviews,
  setSearchQuery,
  toggleSearchBar,
  setCurrentMessageText,
  toggleEmojiPicker,
  addEmoji,
  initializeChat,
  clearChatMessages,
  addSharedImage,
} = messageSlice.actions;

// Selectors
export const selectMessagesByChatId = (chatId: string) => (state: RootState) =>
  state.messages.messages[chatId] || [];

export const selectFilteredMessages = (chatId: string) =>
  createSelector(
    [
      (state: RootState) => state.messages.messages[chatId] || [],
      (state: RootState) => state.messages.searchQuery,
    ],
    (messages, searchQuery) => {
      if (!searchQuery) return messages;
      const query = searchQuery.toLowerCase();
      return messages.filter((msg) => msg.text.toLowerCase().includes(query));
    }
  );

// Updated to only handle images
export const selectSharedImages = (chatId: string) =>
  createSelector([selectFilteredMessages(chatId)], (messages) => {
    return messages
      .filter((msg) => msg.files?.some((file) => file.type === "image"))
      .flatMap((msg) =>
        (msg.files || [])
          .filter((file) => file.type === "image")
          .map((file) => ({
            src: file.url,
            alt: `Image shared by ${msg.sender}`,
          }))
      );
  });

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
export const selectSharedImagesByChatId =
  (chatId: string) => (state: RootState) =>
    state.messages.sharedImages[chatId] || [];

export default messageSlice.reducer;
