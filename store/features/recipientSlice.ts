import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IRecipient {
  id: number;
  userId: number;
  messageId: number;
}

export interface RecipientInitialState {
  recipients: IRecipient[];
}

const initialState: RecipientInitialState = {
  recipients: [],
};

const recipientSlice = createSlice({
  name: "recipients",
  initialState,
  reducers: {
    setRecipients: (state, action: PayloadAction<IRecipient[]>) => {
      state.recipients = action.payload;
    },
    addRecipients: (state, action: PayloadAction<IRecipient>) => {
      state.recipients.push(action.payload); // Push new role directly into the array
    },

    updateRecipients: (state, action: PayloadAction<IRecipient>) => {
      const index = state.recipients.findIndex(
        (recipient) => recipient.id === action.payload.id
      );
      if (index !== -1) {
        state.recipients[index] = {
          ...state.recipients[index],
          ...action.payload,
        };
      }
    },
    deleteRecipients: (state, action: PayloadAction<number>) => {
      state.recipients = state.recipients.filter(
        (recipients) => recipients.id !== action.payload
      );
    },
  },
});

export const {
  setRecipients,
  addRecipients,
  updateRecipients,
  deleteRecipients,
} = recipientSlice.actions;
export const selectRecipients = (state: RootState) => state.recipients;
export default recipientSlice.reducer;
