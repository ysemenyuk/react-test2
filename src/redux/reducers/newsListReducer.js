import {
  NEWS_LIST_REQUEST,
  NEWS_LIST_SUCCESS,
  NEWS_LIST_FAIL,
  NEWS_LIST_UPDATE_REQUEST,
  NEWS_LIST_UPDATE_CANCEL,
  NEWS_LIST_UPDATE_SUCCESS,
  NEWS_LIST_UPDATE_FAIL,
} from '../actions/types';

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
    case NEWS_LIST_UPDATE_REQUEST:
      return {
        ...state,
        updating: true,
      };
    case NEWS_LIST_UPDATE_CANCEL:
      return {
        ...state,
        updating: false,
      };
    case NEWS_LIST_UPDATE_SUCCESS:
      return {
        ...state,
        error: null,
        updating: false,
        data: action.payload,
      };
    case NEWS_LIST_UPDATE_FAIL:
      return {
        ...state,
        updating: false,
      };
    default:
      return state;
  }
};
