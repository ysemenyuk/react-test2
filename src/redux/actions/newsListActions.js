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
  dispatch(newsListRequest());

  try {
    const respIds = await getNewsIds();
    const promises = respIds.map(async (id) => await apiService.fetchItem(id));
    const newsList = await Promise.all(promises);

    dispatch(newsListSucces(newsList));
  } catch (err) {
    dispatch(newsListFail(err));
  }
};

export const updateNewsList = () => async (dispatch, getState) => {
  dispatch(newsListUpdateRequest());

  try {
    const respIds = await getNewsIds();

    const existNewsList = getState().newsList.data;
    const existIds = existNewsList.map((i) => i.id);

    const newIds = _.difference(respIds, existIds);

    if (newIds.length === 0) {
      dispatch(newsListUpdateCancel());
      return;
    }

    const promises = newIds.map(async (id) => await apiService.fetchItem(id));
    const newNews = await Promise.all(promises);

    const updatedNewsList = [...newNews, ...existNewsList].slice(0, NEWS_ITEMS_LIMIT);

    dispatch(newsListUpdateSucces(updatedNewsList));
  } catch (err) {
    dispatch(newsListUpdateFail(err));
  }
};

export const updateNewsListWithScore = () => async (dispatch, getState) => {
  dispatch(newsListUpdateRequest());

  try {
    const respIds = await getNewsIds();
    const promises = respIds.map(async (id) => await apiService.fetchItem(id));
    const newsList = await Promise.all(promises);

    const existNewsList = getState().newsList.data;

    const equal = _.isEqual(newsList, existNewsList);

    if (equal) {
      dispatch(newsListUpdateCancel());
      return;
    }

    dispatch(newsListUpdateSucces(newsList));
  } catch (err) {
    dispatch(newsListUpdateFail(err));
  }
};

const newsListRequest = () => ({
  type: NEWS_LIST_REQUEST,
});

const newsListSucces = (data) => ({
  type: NEWS_LIST_SUCCESS,
  payload: data,
});

const newsListFail = (err) => ({
  type: NEWS_LIST_FAIL,
  payload: err.message,
});

const newsListUpdateRequest = () => ({
  type: NEWS_LIST_UPDATE_REQUEST,
});

const newsListUpdateCancel = () => ({
  type: NEWS_LIST_UPDATE_CANCEL,
});

const newsListUpdateSucces = (data) => ({
  type: NEWS_LIST_UPDATE_SUCCESS,
  payload: data,
});

const newsListUpdateFail = (err) => ({
  type: NEWS_LIST_UPDATE_FAIL,
  payload: err.message,
});
