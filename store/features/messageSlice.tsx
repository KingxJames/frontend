import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
    id: string;
    user: string;
    content: string;
    timestamp: string;
}

interface MessagesState {
    messages: Message[];
}

const initialState: MessagesState = {
    messages: [],
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        setMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
        },
    },
});

export const { addMessage, setMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
