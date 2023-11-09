// Action Types
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_RESULTS_PER_PAGE = 'SET_RESULTS_PER_PAGE';

// Action Creators
export const setCurrentPage = (page: number) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
};

export const setResultsPerPage = (resultsPerPage: number) => {
    return {
        type: SET_RESULTS_PER_PAGE,
        payload: resultsPerPage,
    }
};