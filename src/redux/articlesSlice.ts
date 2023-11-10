import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMostViewedPages } from '../api/api';

// Articles/Pages
interface ArticlesState {
  articles: {rank: number, article: string, views: number}[];
  loading: boolean;
  error: string | null;
  date: Date,
  country: string,
  resultsPerPage: number,
  totalPages: number,
  currentPage: number,
  currentPageArticles: {rank: number, article: string, views: number}[],
}

const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: null,
  date: new Date(Date.now() - 86400000), // yesterday
  country: 'en.wikipedia',
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
    // Reducers to update date, resultsPerPage, and country
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setResultsPerPage: (state, action) => {
      state.resultsPerPage = action.payload;
      state.currentPage = 1;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    // Reducers to handle pagination
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
