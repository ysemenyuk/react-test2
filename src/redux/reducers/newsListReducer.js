import { NEWS_LIST_REQUEST, NEWS_LIST_SUCCESS, NEWS_LIST_FAIL } from '../actions/types';

const initialState = { error: null, loading: false, updating: false, data: [] };

export const newsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEWS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEWS_LIST_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        data: action.payload,
      };
    case NEWS_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
