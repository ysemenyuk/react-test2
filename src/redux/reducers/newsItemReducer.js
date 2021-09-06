import { NEWS_ITEM_REQUEST, NEWS_ITEM_SUCCESS, NEWS_ITEM_FAIL } from '../actions/types';

const initialState = { error: null, loading: false, data: {} };

export const newsItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEWS_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEWS_ITEM_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        data: action.payload,
      };
    case NEWS_ITEM_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case 'NEWS_ITEM_RESET':
      return {
        ...initialState,
        };
    default:
      return state;
  }
};
