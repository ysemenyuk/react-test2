import {
  COMMENTS_SUCCESS,
  COMMENTS_REQUEST,
  COMMENTS_FAIL,
  COMMENTS_UPDATE_REQUEST,
  COMMENTS_UPDATE_CANCEL,
  COMMENTS_UPDATE_SUCCESS,
  COMMENTS_UPDATE_FAIL,
} from '../actions/types';

export const commentsReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENTS_REQUEST:
      return {
        ...state,
        [action.payload.id]: {
          error: null,
          loading: true,
          updating: false,
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
    case COMMENTS_UPDATE_REQUEST:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          error: null,
          updating: true,
        },
      };
    case COMMENTS_UPDATE_CANCEL:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          updating: false,
        },
      };
    case COMMENTS_UPDATE_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          error: null,
          updating: false,
          data: action.payload.data,
        },
      };
    case COMMENTS_UPDATE_FAIL:
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
