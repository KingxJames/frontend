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
}

const initialState: LeftPanelState = {
  activeTab: 0,
  searchQuery: "",
  selectedChat: null,
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

// Export the slice reducer
export default leftPanelSlice.reducer;