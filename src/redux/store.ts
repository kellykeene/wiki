import { configureStore } from '@reduxjs/toolkit';
import articleReducer from './articlesSlice';

export const store = configureStore({
  reducer: {
    articles: articleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof configureStore>
