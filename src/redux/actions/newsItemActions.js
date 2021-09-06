// import _ from 'lodash';
import apiService from '../../sevices/apiService';

import { NEWS_ITEM_REQUEST, NEWS_ITEM_SUCCESS, NEWS_ITEM_FAIL } from './types';

export const getNewsItem = (id) => async (dispatch) => {
  dispatch({
    type: NEWS_ITEM_REQUEST,
  });

  try {
    const item = await apiService.fetchItem(id);
    dispatch({
      type: NEWS_ITEM_SUCCESS,
      payload: item,
    });
  } catch (err) {
    dispatch({
      type: NEWS_ITEM_FAIL,
      payload: err,
    });
  }
};

export const resetNewsItem = () => {
  return {
    type: 'NEWS_ITEM_RESET',
  };
};
