import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Message {
//   id: string;
//   content: string;
//   timestamp: string;
//   senderId: string;
// }

// interface ChatState {
//   messages: Record<string, Message[]>;
// }

const initialState = {
  messages: []
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { chatUserId, message } = action.payload;
      if (!state.messages[chatUserId]) {
        state.messages[chatUserId] = [];
      }

      state.messages[chatUserId].push(message);
    }
  }
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;