import _ from 'lodash';
import apiService from '../../sevices/apiService';

import {
  NEWS_LIST_REQUEST,
  NEWS_LIST_SUCCESS,
  NEWS_LIST_FAIL,
  // NEWS_LIST_UPDATE_REQUEST,
  // NEWS_LIST_UPDATE_CANCEL,
  // NEWS_LIST_UPDATE_SUCCESS,
  // NEWS_LIST_UPDATE_FAIL,
} from './types';

const NEWS_LIMIT = 50;

const getNewsIds = async () => {
  const news = await apiService.fetchNews();
  const limitedIds = news.slice(0, NEWS_LIMIT);
  return limitedIds;
};

export const getNewsList = () => async (dispatch, getState) => {
  dispatch({
    type: NEWS_LIST_REQUEST,
  });

  try {
    const respIds = await getNewsIds();
    const promises = respIds.map(async (id) => await apiService.fetchItem(id));
    const respNewsList = await Promise.all(promises);

    dispatch({
      type: NEWS_LIST_SUCCESS,
      payload: respNewsList,
    });
  } catch (err) {
    console.log('getNewsList err', err);
    dispatch({
      type: NEWS_LIST_FAIL,
      payload: err,
    });
  }
};

export const updateNewsListWithScore = () => async (dispatch, getState) => {
  try {
    const respIds = await getNewsIds();
    const promises = respIds.map(async (id) => await apiService.fetchItem(id));
    const respNewsList = await Promise.all(promises);

    const existNewsList = getState().newsList.data;

    const eq = _.isEqual(respNewsList, existNewsList);
    console.log('updateNewsListWithScore eq', eq);

    if (eq) return;

    dispatch({
      type: NEWS_LIST_SUCCESS,
      payload: respNewsList,
    });
  } catch (err) {
    console.log('updateNewsListWithScore err', err);
  }
};

export const updateNewsList = () => async (dispatch, getState) => {
  try {
    const respIds = await getNewsIds();
    // console.log('respIds', respIds);

    const existNewsList = getState().newsList.data;
    const existIds = existNewsList.map((i) => i.id);
    // console.log('existIds', existIds);

    const newIds = _.difference(respIds, existIds);
    console.log('newIds', newIds);

    if (newIds.length === 0) return;

    const promises = newIds.map(async (id) => await apiService.fetchItem(id));
    const newNews = await Promise.all(promises);
    // console.log('newNews', newNews);

    const updatedNewsList = [...newNews, ...existNewsList].slice(0, NEWS_LIMIT);
    // console.log('updatedNewsList', updatedNewsList);

    dispatch({
      type: NEWS_LIST_SUCCESS,
      payload: updatedNewsList,
    });
  } catch (err) {
    console.log('updateNewsList err', err);
  }
};
