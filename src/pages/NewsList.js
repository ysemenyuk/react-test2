import React from 'react';
import { Button, Segment, Container, List, Loader, Message } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getNewsList,
  updateNewsList,
  updateNewsListWithScore,
} from '../redux/actions/newsListActions';

function NewsList() {
  const dispatch = useDispatch();
  const NewsList = useSelector((state) => state.newsList);
  const { error, loading, updating, data } = NewsList;

  console.log('NewsList NewsList', NewsList);

  React.useEffect(() => {
    data.length ? dispatch(updateNewsList()) : dispatch(getNewsList());
  }, [dispatch, data.length]);

  React.useEffect(() => {
    const timerId = setInterval(() => {
      console.log('update');
      dispatch(updateNewsList());
    }, 10000);
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
        <Button content='Update list' primary loading={updating} onClick={handleUpdateClick} />
      </Segment>
      <Segment basic>
        {error && <Message negative content='Error' />}
        {loading && <Loader active inline='centered' />}
        {!loading && data.length !== 0 && (
          <List divided relaxed>
            {data.map((item) => {
              if (!item) return null;
              const { id, title, by, time, score, kids } = item;
              return (
                <List.Item key={id} as={Link} to={`/news/${id}`}>
                  <List.Icon name='newspaper' size='large' verticalAlign='top' />
                  <List.Content>
                    <List.Header>{title}</List.Header>
                    <List.Description>
                      by {by} at {new Date(time * 1000).toLocaleString()}
                    </List.Description>
                    <List.Description>
                      score {score} {kids && `comments ${kids.length}`}
                    </List.Description>
                  </List.Content>
                </List.Item>
              );
            })}
          </List>
        )}
      </Segment>
    </Container>
  );
}

export default NewsList;
