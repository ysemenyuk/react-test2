import _ from 'lodash';
import apiService from '../../sevices/apiService';

import {
  COMMENTS_LIST_REQUEST,
  COMMENTS_LIST_SUCCESS,
  COMMENTS_LIST_FAIL,
  COMMENTS_LIST_UPDATE_REQUEST,
  COMMENTS_LIST_UPDATE_CANCEL,
  COMMENTS_LIST_UPDATE_SUCCESS,
  COMMENTS_LIST_UPDATE_FAIL,
} from './types';

const fetchComments = async (ids) => {
  const promises = ids.map(async (id) => await apiService.fetchItem(id));
  const comments = await Promise.all(promises);

  const ps = comments.map(async (item) => {
    return {
      id: item.id,
      data: item,
      kids: item.kids ? await fetchComments(item.kids) : null,
    };
  });

  return await Promise.all(ps);
};

export const getCommentsList = (id) => async (dispatch) => {
  dispatch(commentsListRequest(id));

  try {
    const newsItem = await apiService.fetchItem(id);
    const comments = await fetchComments(newsItem.kids);

    dispatch(commentsListSucces(id, comments));
  } catch (err) {
    dispatch(commentsListFail(id, err));
  }
};

export const updateCommentsList = (id) => async (dispatch, getState) => {
  dispatch(commentsListUpdateRequest(id));

  try {
    const newsItem = await apiService.fetchItem(id);
    const comments = await fetchComments(newsItem.kids);

    const existComments = getState().commentsList[id].data;

    if (_.isEqual(comments, existComments)) {
      dispatch(commentsListUpdateCancel(id));
      return;
    }

    dispatch(commentsListUpdateSucces(id, comments));
  } catch (err) {
    dispatch(commentsListUpdateFail(id, err));
  }
};

const commentsListRequest = (id) => ({
  type: COMMENTS_LIST_REQUEST,
  payload: { id },
});

const commentsListSucces = (id, data) => ({
  type: COMMENTS_LIST_SUCCESS,
  payload: { id, data },
});

const commentsListFail = (id, err) => ({
  type: COMMENTS_LIST_FAIL,
  payload: { id, err },
});

const commentsListUpdateRequest = (id) => ({
  type: COMMENTS_LIST_UPDATE_REQUEST,
  payload: { id },
});

const commentsListUpdateCancel = (id) => ({
  type: COMMENTS_LIST_UPDATE_CANCEL,
  payload: { id },
});

const commentsListUpdateSucces = (id, data) => ({
  type: COMMENTS_LIST_UPDATE_SUCCESS,
  payload: { id, data },
});

const commentsListUpdateFail = (id, err) => ({
  type: COMMENTS_LIST_UPDATE_FAIL,
  payload: { id, err },
});
