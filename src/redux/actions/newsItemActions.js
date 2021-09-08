// import _ from 'lodash';
import apiService from '../../sevices/apiService';

import { NEWS_ITEM_REQUEST, NEWS_ITEM_SUCCESS, NEWS_ITEM_FAIL } from './types';

export const getNewsItem = (id) => async (dispatch) => {
  dispatch(newsItemRequest());

  try {
    const item = await apiService.fetchItem(id);
    dispatch(newsItemSucces(item));
  } catch (err) {
    dispatch(newsItemFail(err));
  }
};

export const resetNewsItem = () => ({
  type: 'NEWS_ITEM_RESET',
});

const newsItemRequest = () => ({
  type: NEWS_ITEM_REQUEST,
});

const newsItemSucces = (data) => ({
  type: NEWS_ITEM_SUCCESS,
  payload: data,
});

const newsItemFail = (err) => ({
  type: NEWS_ITEM_FAIL,
  payload: err.message,
});
