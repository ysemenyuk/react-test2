import apiService from '../../sevices/apiService';
import _ from 'lodash';

import {
  COMMENTS_REQUEST,
  COMMENTS_SUCCESS,
  COMMENTS_FAIL,
  COMMENTS_UPDATE_REQUEST,
  COMMENTS_UPDATE_CANCEL,
  COMMENTS_UPDATE_SUCCESS,
  COMMENTS_UPDATE_FAIL,
} from './types';

export const getComments = (id) => async (dispatch, getState) => {
  dispatch({
    type: COMMENTS_REQUEST,
    payload: { id },
  });

  try {
    const parentItem = await apiService.fetchItem(id);
    const promises = parentItem.kids.map(async (id) => await apiService.fetchItem(id));
    const comments = await Promise.all(promises);

    dispatch({
      type: COMMENTS_SUCCESS,
      payload: { id, data: comments },
    });
  } catch (err) {
    dispatch({
      type: COMMENTS_FAIL,
      payload: { id, err },
    });
  }
};

export const updateComments = (id) => async (dispatch, getState) => {
  dispatch({
    type: COMMENTS_UPDATE_REQUEST,
    payload: { id },
  });

  try {
    const parentItem = await apiService.fetchItem(id);
    const promises = parentItem.kids.map(async (id) => await apiService.fetchItem(id));
    const comments = await Promise.all(promises);

    const existComments = getState().comments[id].data;

    const eq = _.isEqual(comments, existComments);

    if (eq) {
      dispatch({
        type: COMMENTS_UPDATE_CANCEL,
        payload: { id },
      });
      return;
    }

    dispatch({
      type: COMMENTS_UPDATE_SUCCESS,
      payload: { id, data: comments },
    });
  } catch (err) {
    dispatch({
      type: COMMENTS_UPDATE_FAIL,
      payload: { id },
    });
  }
};
