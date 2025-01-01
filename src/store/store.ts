import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import chatReducer from './slices/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;