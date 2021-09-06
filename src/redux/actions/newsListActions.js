import _ from 'lodash';
import apiService from '../../sevices/apiService';
import { NEWS_ITEMS_LIMIT } from '../../sevices/constants';
import {
  NEWS_LIST_REQUEST,
  NEWS_LIST_SUCCESS,
  NEWS_LIST_FAIL,
  NEWS_LIST_UPDATE_REQUEST,
  NEWS_LIST_UPDATE_CANCEL,
  NEWS_LIST_UPDATE_SUCCESS,
  NEWS_LIST_UPDATE_FAIL,
} from './types';

const getNewsIds = async () => {
  const news = await apiService.fetchNews();
  const limitedIds = news.slice(0, NEWS_ITEMS_LIMIT);
  return limitedIds;
};

export const getNewsList = () => async (dispatch) => {
  dispatch({
    type: NEWS_LIST_REQUEST,
  });

  try {
    const respIds = await getNewsIds();
    const promises = respIds.map(async (id) => await apiService.fetchItem(id));
    const newsList = await Promise.all(promises);

    dispatch({
      type: NEWS_LIST_SUCCESS,
      payload: newsList,
    });
  } catch (err) {
    dispatch({
      type: NEWS_LIST_FAIL,
      payload: err,
    });
  }
};

export const updateNewsList = () => async (dispatch, getState) => {
  dispatch({
    type: NEWS_LIST_UPDATE_REQUEST,
  });
  try {
    const respIds = await getNewsIds();

    const existNewsList = getState().newsList.data;
    const existIds = existNewsList.map((i) => i.id);

    const newIds = _.difference(respIds, existIds);

    if (newIds.length === 0) {
      dispatch({
        type: NEWS_LIST_UPDATE_CANCEL,
      });
      return;
    }

    const promises = newIds.map(async (id) => await apiService.fetchItem(id));
    const newNews = await Promise.all(promises);

    const updatedNewsList = [...newNews, ...existNewsList].slice(0, NEWS_ITEMS_LIMIT);

    dispatch({
      type: NEWS_LIST_UPDATE_SUCCESS,
      payload: updatedNewsList,
    });
  } catch (err) {
    dispatch({
      type: NEWS_LIST_UPDATE_FAIL,
      payload: err,
    });
  }
};

export const updateNewsListWithScore = () => async (dispatch, getState) => {
  dispatch({
    type: NEWS_LIST_UPDATE_REQUEST,
  });
  try {
    const respIds = await getNewsIds();
    const promises = respIds.map(async (id) => await apiService.fetchItem(id));
    const newsList = await Promise.all(promises);

    const existNewsList = getState().newsList.data;

    const eq = _.isEqual(newsList, existNewsList);

    if (eq) {
      dispatch({
        type: NEWS_LIST_UPDATE_CANCEL,
      });
      return;
    }

    dispatch({
      type: NEWS_LIST_UPDATE_SUCCESS,
      payload: newsList,
    });
  } catch (err) {
    dispatch({
      type: NEWS_LIST_UPDATE_FAIL,
      payload: err,
    });
  }
};
