import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface ChatCardType {
  name: string;
  lastText: string;
  lastSeen: string;
  selected: boolean;
  category: "all" | "emergency" | "anonymous";
  role: string;
  avatarUrl: string;
}

type TabValue = 0 | 1 | 2; // All | Emergency | Anonymous

interface LeftPanelState {
  chats: ChatCardType[];
  activeTab: number;
  searchQuery: string;
  selectedChat: string | null;
}

const initialState: LeftPanelState = {
  chats: [
    {
      name: "Balram",
      lastText: "Hey there testing WhatsApp",
      lastSeen: "4:21 PM",
      selected: false,
      category: "all",
      role: "admin",
      avatarUrl: "https://via.placeholder.com/120",
    },
    {
      name: "Dev Stack",
      lastText: "This is an emergency message",
      lastSeen: "8:51 PM",
      selected: false,
      category: "emergency",
      role: "Super Admin",
      avatarUrl: "https://via.placeholder.com/120",
    },
    {
      name: "John Doe",
      lastText: "This is an anonymous message",
      lastSeen: "7:30 PM",
      selected: false,
      category: "anonymous",
      role: "Staff",
      avatarUrl: "https://via.placeholder.com/120",
    },
  ],
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
      // Deselect all chats first
      state.chats = state.chats.map((chat) => ({
        ...chat,
        selected: false,
      }));

      // Select the new chat
      const chatName = action.payload;
      state.selectedChat = chatName;
      state.chats = state.chats.map((chat) =>
        chat.name === chatName ? { ...chat, selected: true } : chat
      );
    },
    addNewChat: (
      state,
      action: PayloadAction<Omit<ChatCardType, "selected">>
    ) => {
      state.chats.push({
        ...action.payload,
        selected: false,
      });
    },
    updateLastMessage: (
      state,
      action: PayloadAction<{ chatName: string; message: string }>
    ) => {
      state.chats = state.chats.map((chat) =>
        chat.name === action.payload.chatName
          ? {
              ...chat,
              lastText: action.payload.message,
              lastSeen: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }
          : chat
      );
    },
  },
});

export const {
  setActiveTab,
  setSearchQuery,
  selectChat,
  addNewChat,
  updateLastMessage,
} = leftPanelSlice.actions;

// Selectors
export const selectAllChats = (state: RootState) => state.leftPanel.chats;
export const selectActiveTab = (state: RootState) => state.leftPanel.activeTab;
export const selectSearchQuery = (state: RootState) =>
  state.leftPanel.searchQuery;
export const selectSelectedChat = (state: RootState) =>
  state.leftPanel.selectedChat;

export const selectEmergencyChats = createSelector([selectAllChats], (chats) =>
  chats.filter((chat) => chat.category === "emergency")
);

export const selectAnonymousChats = createSelector([selectAllChats], (chats) =>
  chats.filter((chat) => chat.category === "anonymous")
);

export const selectFilteredChats = createSelector(
  [selectAllChats, selectActiveTab, selectSearchQuery],
  (chats, activeTab, searchQuery) => {
    return chats
      .filter((chat) => {
        if (activeTab === 0) return true;
        if (activeTab === 1) return chat.category === "emergency";
        if (activeTab === 2) return chat.category === "anonymous";
        return false;
      })
      .filter((chat) =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }
);

export default leftPanelSlice.reducer;
