import { COMMENTS_SUCCESS, COMMENTS_REQUEST, COMMENTS_FAIL } from '../actions/types';

export const commentsReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENTS_REQUEST:
      return {
        ...state,
        [action.payload.id]: {
          error: null,
          loading: true,
          data: [],
        },
      };
    case COMMENTS_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          error: null,
          loading: false,
          data: action.payload.data,
        },
      };
    case COMMENTS_FAIL:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          error: 'error',
          loading: false,
        },
      };
    default:
      return state;
  }
};
