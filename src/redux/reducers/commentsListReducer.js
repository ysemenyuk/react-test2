import {
  COMMENTS_LIST_REQUEST,
  COMMENTS_LIST_SUCCESS,
  COMMENTS_LIST_FAIL,
  COMMENTS_LIST_UPDATE_REQUEST,
  COMMENTS_LIST_UPDATE_CANCEL,
  COMMENTS_LIST_UPDATE_SUCCESS,
  COMMENTS_LIST_UPDATE_FAIL,
} from '../actions/types';

export const commentsListReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENTS_LIST_REQUEST:
      return {
        ...state,
        [action.payload.id]: {
          id: action.payload.id,
          error: null,
          loading: true,
          updating: false,
          data: [],
        },
      };
    case COMMENTS_LIST_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          error: null,
          loading: false,
          data: action.payload.data,
        },
      };
    case COMMENTS_LIST_FAIL:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          error: 'error',
          loading: false,
        },
      };
    case COMMENTS_LIST_UPDATE_REQUEST:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          error: null,
          updating: true,
        },
      };
    case COMMENTS_LIST_UPDATE_CANCEL:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          updating: false,
        },
      };
    case COMMENTS_LIST_UPDATE_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          error: null,
          updating: false,
          data: action.payload.data,
        },
      };
    case COMMENTS_LIST_UPDATE_FAIL:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          updating: false,
        },
      };
    default:
      return state;
  }
};
