import { AnyAction } from 'redux';
import { SET_CURRENT_PAGE, SET_RESULTS_PER_PAGE } from './actions';

const initialState = {
  currentPage: 1,
  resultsPerPage: 100
};

const paginationReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };
        case SET_RESULTS_PER_PAGE:
            return {
                ...state,
                resultsPerPage: action.payload,
            }
        default:
            return state;
  }
};

export default paginationReducer;
