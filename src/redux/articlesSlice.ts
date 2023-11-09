import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMostViewedPages } from '../api';

interface WikiState {
  articles: any[];
  loading: boolean;
  error: string | null;
}

const initialState: WikiState = {
  articles: [],
  loading: false,
  error: null,
};

export const getMostViewedPages = createAsyncThunk(
  'wiki/getMostViewedPages',
  async ({ project, date }: { project: string; date: Date; }) => {
    return await fetchMostViewedPages(project, date);
  }
);

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMostViewedPages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMostViewedPages.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(getMostViewedPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default articlesSlice.reducer;
