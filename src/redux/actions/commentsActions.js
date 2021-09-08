import _ from 'lodash';
import apiService from '../../sevices/apiService';

import {
  COMMENTS_REQUEST,
  COMMENTS_SUCCESS,
  COMMENTS_FAIL,
  COMMENTS_UPDATE_REQUEST,
  COMMENTS_UPDATE_CANCEL,
  COMMENTS_UPDATE_SUCCESS,
  COMMENTS_UPDATE_FAIL,
} from './types';

export const getComments = (id) => async (dispatch) => {
  dispatch(commentsRequest(id));

  try {
    const parentItem = await apiService.fetchItem(id);
    const promises = parentItem.kids.map(async (id) => await apiService.fetchItem(id));
    const comments = await Promise.all(promises);

    dispatch(commentsSucces(id, comments));
  } catch (err) {
    dispatch(commentsFail(id, err));
  }
};

export const updateComments = (id) => async (dispatch, getState) => {
  dispatch(commentsUpdateRequest(id));

  try {
    const parentItem = await apiService.fetchItem(id);
    const promises = parentItem.kids.map(async (id) => await apiService.fetchItem(id));
    const comments = await Promise.all(promises);

    const existComments = getState().comments[id].data;

    if (_.isEqual(comments, existComments)) {
      dispatch(commentsUpdateCancel(id));
      return;
    }

    dispatch(commentsUpdateSucces(id, comments));
  } catch (err) {
    dispatch(commentsUpdateFail(id, err));
  }
};

const commentsRequest = (id) => ({
  type: COMMENTS_REQUEST,
  payload: { id },
});

const commentsSucces = (id, data) => ({
  type: COMMENTS_SUCCESS,
  payload: { id, data },
});

const commentsFail = (id, err) => ({
  type: COMMENTS_FAIL,
  payload: { id, err },
});

const commentsUpdateRequest = (id) => ({
  type: COMMENTS_UPDATE_REQUEST,
  payload: { id },
});

const commentsUpdateCancel = (id) => ({
  type: COMMENTS_UPDATE_CANCEL,
  payload: { id },
});

const commentsUpdateSucces = (id, data) => ({
  type: COMMENTS_UPDATE_SUCCESS,
  payload: { id, data },
});

const commentsUpdateFail = (id, err) => ({
  type: COMMENTS_UPDATE_FAIL,
  payload: { id, err },
});
