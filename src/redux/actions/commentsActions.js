import axios from 'axios';
import _ from 'lodash';

import {
  COMMENTS_LIST_REQUEST,
  COMMENTS_LIST_SUCCESS,
  COMMENTS_LIST_FAIL,
  // COMMENT_DETAILS_REQUEST,
  // COMMENT_DETAILS_SUCCESS,
  // COMMENT_DETAILS_FAIL,
} from './types';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const getCommentDetails = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/item/${id}.json`);
    return data;
  } catch (err) {
    // console.log('getCommentDetails err', err);
  }
};

export const getComments = (id, ids) => async (dispatch, getState) => {
  dispatch({
    type: COMMENTS_LIST_REQUEST,
    payload: { id },
  });

  try {
    const promises = ids.map((id) => dispatch(getCommentDetails(id)));
    const result = await Promise.all(promises);

    dispatch({
      type: COMMENTS_LIST_SUCCESS,
      payload: { id, data: result },
    });

    return result;
  } catch (err) {
    // console.log(2, err);
    dispatch({
      type: COMMENTS_LIST_FAIL,
      payload: { id },
    });
  }
};

export const updateComments = (id, ids) => async (dispatch, getState) => {
  // dispatch({
  //   type: COMMENTS_LIST_REQUEST,
  //   payload: { id },
  // });

  try {
    const existComments = getState().comments[id].data;

    const promises = ids.map((id) => dispatch(getCommentDetails(id)));
    const respComments = await Promise.all(promises);

    const eq = _.isEqual(respComments, existComments);
    console.log('updateComments eq', eq);

    // dispatch({
    //   type: COMMENTS_LIST_SUCCESS,
    //   payload: { id, data: result },
    // });
  } catch (err) {
    console.log('updateComments err', err);
    // dispatch({
    //   type: COMMENTS_LIST_FAIL,
    //   payload: { id },
    // });
  }
};

const getCommentsList = async (ids) => {
  const promises = ids.map(async (id) => await axios.get(`${BASE_URL}/item/${id}.json`));
  const comments = await Promise.all(promises);

  const ps = comments.map(async ({ data }) => {
    const kids = data.kids ? await getCommentsList(data.kids) : null;
    return {
      id: data.id,
      data,
      kids,
    };
  });

  return await Promise.all(ps);
};

export const getItemCommentsList = (id, ids) => async (dispatch, getState) => {
  dispatch({
    type: COMMENTS_LIST_REQUEST,
    payload: { id },
  });

  try {
    const comments = await getCommentsList(ids);

    console.log('getItemCommentsList', comments);

    dispatch({
      type: COMMENTS_LIST_SUCCESS,
      payload: { id, data: comments },
    });

    // return result;
  } catch (err) {
    console.log('getCommentsList, err');
    dispatch({
      type: COMMENTS_LIST_FAIL,
      payload: { id },
    });
  }
};
