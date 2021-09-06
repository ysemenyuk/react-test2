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

function NewsListPage() {
  const dispatch = useDispatch();
  const newsList = useSelector((state) => state.newsList);
  const { error, loading, updating, data } = newsList;

  React.useEffect(() => {
    data.length ? dispatch(updateNewsList()) : dispatch(getNewsList());
  }, [dispatch, data.length]);

  React.useEffect(() => {
    const timerId = setInterval(() => {
      dispatch(updateNewsList());
    }, NEWS_UPDATE_INTERVAL);
    return () => {
      clearInterval(timerId);
    };
  }, [dispatch]);

  const handleUpdateClick = () => {
    dispatch(updateNewsListWithScore());
  };

  return (
    <Container>
      <Segment basic>
        <Button
          content='Update list'
          primary
          loading={updating}
          onClick={handleUpdateClick}
        />
      </Segment>
      <Segment basic>
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
