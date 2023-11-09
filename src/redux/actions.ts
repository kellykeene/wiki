// Action Types
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

// Action Creators
export const setCurrentPage = (page: number) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
};
