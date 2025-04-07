import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";

// export interface IMessage {
//   id: string;
//   user: string;
//   messag_category_id: number;
//   sender_id: number;
//   sender: string;
//   topic: string;
//   images: string;
//   message: string;
//   location: string;
//   date_sent: Date;
//   is_archive: boolean;
//   is_deleted: boolean;
//   is_forwarded: boolean;
//   timestamp: string;
// }

// interface MessagesInitialState {
//   messages: IMessage[];
// }

// const initialState: MessagesInitialState = {
//   messages: [],
// };

// export const messagesSlice = createSlice({
//   name: "messages",
//   initialState,
//   reducers: {
//     addMessages: (state, action: PayloadAction<IMessage>) => {
//       state.messages.push(action.payload);
//     },
//     setMessages: (state, action: PayloadAction<IMessage[]>) => {
//       state.messages = action.payload;
//     },
//     updateMessages: (state, action: PayloadAction<IMessage>) => {
//       const index = state.messages.findIndex(
//         (messages) => messages.id === action.payload.id
//       );
//       if (index !== -1) {
//         state.messages[index] = { ...state.messages[index], ...action.payload };
//       }
//     },
//     deleteMessages: (state, action: PayloadAction<string>) => {
//       state.messages = state.messages.filter(
//         (messages) => messages.id !== action.payload
//       );
//     },
//   },
// });

// export const { addMessages, setMessages, updateMessages, deleteMessages } =
//   messagesSlice.actions;
// export const selectMessages = (state: RootState) => state.messages;
// export default messagesSlice.reducer;

interface FilePreview {
  id: string;
  url: string;
  name: string;
  type: string;
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
  messages: Record<string, Message[]>; // Key is chatId, value is array of messages
  searchQuery: string;
  showSearchBar: boolean;
  filePreviews: FilePreview[];
  currentMessageText: string;
  showEmojiPicker: boolean;
}

const initialState: MessagesState = {
  messages: {},
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
    // Message actions
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

    // File preview actions
    addFilePreviews: (state, action: PayloadAction<FilePreview[]>) => {
      state.filePreviews.push(...action.payload);
    },

    removeFilePreview: (state, action: PayloadAction<string>) => {
      const fileToRemove = state.filePreviews.find(
        (file) => file.id === action.payload
      );
      if (fileToRemove) {
        state.filePreviews = state.filePreviews.filter(
          (file) => file.id !== action.payload
        );
      }
    },

    clearFilePreviews: (state) => {
      state.filePreviews = [];
    },

    // UI state actions
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

    // Initialize chat if it doesn't exist
    initializeChat: (state, action: PayloadAction<string>) => {
      const chatId = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
    },

    // Clear all messages for a chat
    clearChatMessages: (state, action: PayloadAction<string>) => {
      const chatId = action.payload;
      if (state.messages[chatId]) {
        state.messages[chatId] = [];
      }
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
} = messageSlice.actions;

// Selectors
export const selectMessagesByChatId = (chatId: string) => (state: RootState) =>
  state.messages.messages[chatId] || [];

// Update your selectFilteredMessages selector
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

export const selectSharedImages = (chatId: string) =>
  createSelector([selectFilteredMessages(chatId)], (messages) => {
    return messages
      .filter((msg) =>
        msg.files?.some(
          (file) =>
            file.url.startsWith("blob") ||
            file.url.match(/\.(jpeg|jpg|png|gif|mp4|mov|avi)$/i)
        )
      )
      .flatMap((msg) =>
        (msg.files || [])
          .filter(
            (file) =>
              file.url.startsWith("blob") ||
              file.url.match(/\.(jpeg|jpg|png|gif|mp4|mov|avi)$/i)
          )
          .map((file) => ({
            src: file.url,
            alt: `Media shared by ${msg.sender}`,
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

export default messageSlice.reducer;
