/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Button, Segment, Container, Loader, Message, Header } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getNewsList,
  updateNewsList,
  updateNewsListWithScore,
} from '../redux/actions/newsListActions';

import NewsList from '../components/NewsList/NewsList';
import { NEWS_UPDATE_INTERVAL } from '../sevices/constants';

const listSelector = (state) => state.newsList;

function NewsListPage() {
  const dispatch = useDispatch();
  const newsList = useSelector(listSelector);
  const { error, loading, updating, data } = newsList;

  React.useEffect(() => {
    data.length ? dispatch(updateNewsList()) : dispatch(getNewsList());
  }, []);

  React.useEffect(() => {
    const timerId = setInterval(() => {
      dispatch(updateNewsList());
    }, NEWS_UPDATE_INTERVAL);
    return () => {
      clearInterval(timerId);
    };
  }, [dispatch]);

  const handleUpdateClick = () => {
    dispatch(updateNewsList());
  };

  const handleUpdateClickWithScore = () => {
    dispatch(updateNewsListWithScore());
  };

  return (
    <Container>
      <Segment basic>
        <Button
          content='Update list diff'
          primary
          disabled={loading || updating}
          onClick={handleUpdateClick}
        />
        <Button
          content='Update list full'
          primary
          disabled={loading || updating}
          onClick={handleUpdateClickWithScore}
        />
        {loading || updating ? 'Loading...' : null}

        <Header as='h2' dividing>
          Last news
        </Header>
        {error && <Message negative content='Error' />}
        {loading && <Loader active inline='centered' />}
        {!loading && data.length !== 0 && <NewsList list={data} />}
      </Segment>
    </Container>
  );
}

export default NewsListPage;
