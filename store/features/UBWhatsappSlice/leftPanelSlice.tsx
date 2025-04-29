import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface ChatCardType {
  id: string;
  name: string;
  lastText: string;
  lastSeen: string;
  selected: boolean;
  category: "all" | "emergency" | "anonymous";
  role: string;
  avatarUrl: string;
}

interface LeftPanelState {
  activeTab: number;
  searchQuery: string;
  selectedChat: string | null;
  chats: ChatCardType[]; // Add chats property
}
const initialState: LeftPanelState = {
  activeTab: 0,
  searchQuery: "",
  selectedChat: null,
  chats: [], // Initialize chats as an empty array
};


export const leftPanelSlice = createSlice({
  name: "leftPanel",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    selectChat: (state, action: PayloadAction<string>) => {
      state.selectedChat = action.payload;
    },

  },
});

export const { setActiveTab, setSearchQuery, selectChat } = leftPanelSlice.actions;

// Selectors
export const selectActiveTab = (state: RootState) => state.leftPanel.activeTab;
export const selectSearchQuery = (state: RootState) => state.leftPanel.searchQuery;
export const selectSelectedChat = (state: RootState) => state.leftPanel.selectedChat;
export const selectFilteredChats = (state: RootState) => {
  const { searchQuery } = state.leftPanel;
  const chats = state.leftPanel.chats; // Assuming you have a list of chats in your state
  return chats.filter((chat: ChatCardType) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}

// Export the slice reducer
export default leftPanelSlice.reducer;