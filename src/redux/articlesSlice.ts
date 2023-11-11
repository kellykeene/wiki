import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMostViewedPages } from '../api/api';

// Articles/Pages
export interface ArticlesState {
  articles: {rank: number, article: string, views: number}[];
  loading: boolean;
  error: string | null;
  resultsPerPage: number,
  totalPages: number,
  currentPage: number,
  currentPageArticles: {rank: number, article: string, views: number}[],
}

const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: null,
  resultsPerPage: 100,
  totalPages: 0,
  currentPage: 1,
  currentPageArticles: [],
};

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ country, date }: { country: string, date: Date}) => {
    return await fetchMostViewedPages(country, date);
  }
);

const setCurrentPageArticles = (articles: {rank: number, article: string, views: number}[], currentPage: number, resultsPerPage: number) => {
  return articles.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setResultsPerPage: (state, action) => {
      state.resultsPerPage = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      state.currentPageArticles = setCurrentPageArticles(state.articles, state.currentPage, state.resultsPerPage);
    },
  },
  extraReducers: (builder) => {
    // Handle async thunk lifecycle for fetching articles
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
        state.currentPage = 1;
        state.totalPages = Math.ceil(state.articles.length / state.resultsPerPage);
        state.currentPageArticles = setCurrentPageArticles(state.articles, state.currentPage, state.resultsPerPage);
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { setCurrentPage, setResultsPerPage } = articlesSlice.actions;
export default articlesSlice.reducer;
