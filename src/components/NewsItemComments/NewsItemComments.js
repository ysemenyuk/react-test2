import React, { useEffect } from 'react';
import { Button, Segment, Header, Divider } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateComments } from '../../redux/actions/commentsActions';
import CommentsList from './CommentsList';
import { COMMENTS_UPDATE_INTERVAL } from '../../sevices/constants';

function NewsItemsComments({ parentId }) {
  const dispatch = useDispatch();
  const itemComments = useSelector((state) => state.comments[parentId]);

  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch(updateComments(parentId));
    }, COMMENTS_UPDATE_INTERVAL);

    return () => {
      clearInterval(timerId);
    };
  }, [dispatch, parentId]);

  const handleUpdateCommentsClick = () => {
    dispatch(updateComments(parentId));
  };

  return (
    <Segment basic>
      <Header as='h4' dividing>
        Comments
      </Header>
      <Button content='Update comments' primary loading={itemComments?.updating} onClick={handleUpdateCommentsClick} />
      <Divider />
      <CommentsList parentId={parentId} />
    </Segment>
  );
}

export default NewsItemsComments;
