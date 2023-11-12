import reducer, { setCurrentPage, setResultsPerPage, ArticlesState } from './articlesSlice'

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual(
    { 
        articles: [],
        loading: false,
        error: null,
        resultsPerPage: 100,
        totalPages: 0,
        currentPage: 1,
        currentPageArticles: [], 
    }
  )
})

test('should handle setting the currentPage to 4', () => {
  const previousState: ArticlesState = {
        articles: [],
        loading: false,
        error: null,
        resultsPerPage: 100,
        totalPages: 0,
        currentPage: 1,
        currentPageArticles: [], 
    };

  expect(reducer(previousState, setCurrentPage(4))).toEqual(
    {
        articles: [],
        loading: false,
        error: null,
        resultsPerPage: 100,
        totalPages: 0,
        currentPage: 4,
        currentPageArticles: [], 
    }
  )
})

test('should handle setting the number of results per page to 50', () => {
  const previousState: ArticlesState = {
    articles: [],
    loading: false,
    error: null,
    resultsPerPage: 100,
    totalPages: 0,
    currentPage: 1,
    currentPageArticles: [], 
};

  expect(reducer(previousState, setResultsPerPage(50))).toEqual(
    {
        articles: [],
        loading: false,
        error: null,
        resultsPerPage: 50,
        totalPages: 0,
        currentPage: 1,
        currentPageArticles: [], 
    }
  )
})

// test('test fetchArticles thunk', async () => {
//     const response = await fetchArticles({country: 'fr.wikipedia', date: new Date(Date.now() - 86400000))})(dispatch, getState, extra);
//     expect(dispatch).toHaveBeenCalledTimes(1);
//     expect(dispatch).toHaveBeenCalledWith(fetchArticles.pending);
//     expect(dispatch).toHaveBeenCalledWith(fetchArticles.fulfilled);
//     expect(dispatch).toHaveBeenCalledWith(fetchArticles.rejected);
//     expect(dispatch).toHaveBeenCalledWith(fetchArticles(response));
//     expect(dispatch).toHaveBeenCalledWith(fetchArticles(response));
//     expect

