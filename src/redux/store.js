import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { newsListReducer } from './reducers/newsListReducer';
import { newsItemReducer } from './reducers/newsItemReducer';
import { commentsReducer } from './reducers/commentsReducer';

const rootReducer = combineReducers({
  newsList: newsListReducer,
  newsItem: newsItemReducer,
  comments: commentsReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
