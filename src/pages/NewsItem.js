import React, { useState } from 'react';
import { Button, Segment, Container, Loader, Header, Icon, Comment } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { getNewsItem } from '../redux/actions/newsItemActions';
import { getComments, getItemCommentsList } from '../redux/actions/commentsActions';

// const selector = (state) => state.news.list.data.find((i) => i.id === Number(id));

function NewsListItem() {
  const dispatch = useDispatch();
  let { id } = useParams();

  const item = useSelector((state) => state.newsItem);

  console.log('NewDetails item', item);
  // console.log(789, comments);

  const handleUpdateClick = () => {
    dispatch(getItemCommentsList(id, item.data.kids));
  };

  React.useEffect(() => {
    dispatch(getNewsItem(id));
  }, [dispatch, id]);

  return (
    <Container>
      <Segment basic>
        <Button content='Back to all news' primary as={Link} to='/news' />
        <Button content='Update comments' primary onClick={handleUpdateClick} />
      </Segment>
      <Segment basic>
        {item.loading ? (
          <Loader active inline='centered' />
        ) : (
          <>
            <Header as='h2' dividing>
              <Icon name='newspaper' />
              <Header.Content>{item.data.title}</Header.Content>
            </Header>
            <p>
              <a href={item.data.url}>{item.data.url}</a>
            </p>
            <p>
              by {item.data.by} at {new Date(item.data.time * 1000).toLocaleString()}
            </p>
            <p>
              score {item.data.score} comments {item.data.kids ? item.data.kids.length : 0}
            </p>
          </>
        )}
        {item.data.kids && item.data.kids.length !== 0 && (
          <>
            <Header as='h3' dividing>
              Comments
            </Header>
            <Comments id={item.data.id} ids={item.data.kids} />
          </>
        )}
      </Segment>
    </Container>
  );
}

export default NewsListItem;

function Comments({ id, ids }) {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments[id]);

  console.log('comments', comments);

  React.useEffect(() => {
    if (id && ids) dispatch(getComments(id, ids));
  }, [dispatch, id, ids]);

  const [showReply, setShowReply] = useState({});

  const handleShowReplyClick = (id) => {
    setShowReply((state) => ({ ...state, [id]: !state[id] }));
  };

  if (!comments) return null;

  const { loading, data } = comments;

  return (
    <Comment.Group>
      {loading && <Loader active inline='centered' />}
      {data &&
        data.length !== 0 &&
        data.map((item) => {
          // console.log(item);
          if (!item) return null;
          const isReplies = item.kids && item.kids.length !== 0;

          return (
            <Comment key={item.id}>
              <Comment.Avatar src='' />
              <Comment.Content>
                <Comment.Author as='a'>{item.by}</Comment.Author>
                <Comment.Metadata>{new Date(item.time * 1000).toISOString()}</Comment.Metadata>
                <Comment.Text>{item.text}</Comment.Text>

                {isReplies && (
                  <Button size='mini' compact onClick={() => handleShowReplyClick(item.id)}>
                    {showReply[item.id] ? 'Hide riplies' : 'Show replies'} ({item.kids.length})
                  </Button>
                )}
              </Comment.Content>

              {isReplies && showReply[item.id] && <Comments id={item.id} ids={item.kids} />}
            </Comment>
          );
        })}
    </Comment.Group>
  );
}
