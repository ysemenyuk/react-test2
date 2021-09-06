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
  dispatch({
    type: COMMENTS_LIST_REQUEST,
    payload: { id },
  });

  try {
    const newsItem = await apiService.fetchItem(id);
    const comments = await fetchComments(newsItem.kids);

    dispatch({
      type: COMMENTS_LIST_SUCCESS,
      payload: { id, data: comments },
    });
  } catch (err) {
    dispatch({
      type: COMMENTS_LIST_FAIL,
      payload: { id, err },
    });
  }
};

export const updateCommentsList = (id) => async (dispatch, getState) => {
  dispatch({
    type: COMMENTS_LIST_UPDATE_REQUEST,
    payload: { id },
  });

  try {
    const newsItem = await apiService.fetchItem(id);
    const comments = await fetchComments(newsItem.kids);

    const existComments = getState().commentsList[id].data;

    const eq = _.isEqual(comments, existComments);

    if (eq) {
      dispatch({
        type: COMMENTS_LIST_UPDATE_CANCEL,
        payload: { id },
      });
      return;
    }

    dispatch({
      type: COMMENTS_LIST_UPDATE_SUCCESS,
      payload: { id, data: comments },
    });
  } catch (err) {
    dispatch({
      type: COMMENTS_LIST_UPDATE_FAIL,
      payload: { id, err },
    });
  }
};
