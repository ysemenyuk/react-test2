import React, { useState } from 'react';
import {
  Button,
  Segment,
  Container,
  Loader,
  Header,
  Icon,
  Comment,
  Message,
} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import avatar from '../images/elliot.jpg';
import { getNewsItem } from '../redux/actions/newsItemActions';
import { getCommentsList, updateCommentsList } from '../redux/actions/commentsListActions';

function NewsItemContainer() {
  const dispatch = useDispatch();
  let { id } = useParams();

  const newsItem = useSelector((state) => state.newsItem);
  // console.log('NewsItem newsItem', newsItem);

  React.useEffect(() => {
    dispatch(getNewsItem(id));
  }, [dispatch, id]);

  if (!newsItem.data.id) return null;

  const { error, loading, data } = newsItem;
  const commentsIds = data.kids;
  // console.log('NewsItem commentsIds', commentsIds);

  return (
    <Container>
      <Segment basic>
        <Button content='Back to all news' primary as={Link} to='/news' />
      </Segment>
      <Segment basic>
        {loading ? (
          <Loader active inline='centered' />
        ) : error ? (
          <Message negative content='Error' />
        ) : (
          <NewsItem item={data} />
        )}
      </Segment>
      {commentsIds && <CommentsContainer parent={id} />}
    </Container>
  );
}

export default NewsItemContainer;

function NewsItem({ item }) {
  const { title, url, by, time } = item;
  return (
    <>
      <Header as='h2' dividing>
        <Icon name='newspaper' />
        <Header.Content>{title}</Header.Content>
      </Header>
      <p>
        <a href={url}>{url}</a>
      </p>
      <p>
        by {by} at {new Date(time * 1000).toLocaleString()}
      </p>
    </>
  );
}

function CommentsContainer({ parent }) {
  const dispatch = useDispatch();
  const itemComments = useSelector((state) => state.commentsList[parent]);
  const [showReplies, setShowReplies] = useState({});

  console.log('CommentsContainer itemComments', itemComments);

  React.useEffect(() => {
    if (parent) dispatch(getCommentsList(parent));
  }, [dispatch, parent]);

  React.useEffect(() => {
    const timerId = setInterval(() => {
      console.log('update');
      dispatch(updateCommentsList(parent));
    }, 10000);
    return () => {
      clearInterval(timerId);
    };
  }, [dispatch, parent]);

  const handleShowRepliesClick = (id) => () => {
    setShowReplies((state) => ({ ...state, [id]: !state[id] }));
  };

  const handleUpdateCommentsClick = () => {
    dispatch(updateCommentsList(parent));
  };

  if (!itemComments) return null;

  const { error, loading, updating, data } = itemComments;

  return (
    <Segment basic>
      <Button
        content='Update comments'
        primary
        loading={updating}
        onClick={handleUpdateCommentsClick}
      />
      <Header as='h3' dividing>
        Comments
      </Header>
      {loading ? (
        <Loader active inline='centered' />
      ) : error ? (
        <Message negative content='Error' />
      ) : (
        <Comments
          comments={data}
          showReplies={showReplies}
          onShowRepliesClick={handleShowRepliesClick}
        />
      )}
    </Segment>
  );
}

function Comments({ comments, showReplies, onShowRepliesClick }) {
  // console.log('comments', comments);
  return (
    <Comment.Group>
      {comments.map(({ data: { id, by, time, text }, kids }) => {
        return (
          <Comment key={id}>
            <Comment.Avatar src={avatar} />
            <Comment.Content>
              <Comment.Author as='a'>{by}</Comment.Author>
              <Comment.Metadata>{new Date(time * 1000).toISOString()}</Comment.Metadata>
              <Comment.Text>{text}</Comment.Text>

              {kids && (
                <Button size='mini' compact onClick={onShowRepliesClick(id)}>
                  {showReplies[id] ? 'Hide riplies' : 'Show replies'} ({kids.length})
                </Button>
              )}
            </Comment.Content>

            {kids && showReplies[id] && (
              <Comments
                comments={kids}
                showReplies={showReplies}
                onShowRepliesClick={onShowRepliesClick}
              />
            )}
          </Comment>
        );
      })}
    </Comment.Group>
  );
}
