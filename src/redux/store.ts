import { configureStore } from '@reduxjs/toolkit';
import wikiReducer from './wikiSlice';

export const store = configureStore({
  reducer: {
    wiki: wikiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
