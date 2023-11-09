import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './articlesSlice';
import paginationReducer from './paginationReducer';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    pagination: paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
