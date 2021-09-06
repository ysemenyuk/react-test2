import React from 'react';
import { Button, Segment, Header, Divider } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import { updateComments } from '../../redux/actions/commentsActions';
import CommentsContainer from './Comments';
import { COMMENTS_UPDATE_INTERVAL } from '../../sevices/constants';

function NewsItemsComments({ parentId }) {
  const dispatch = useDispatch();
  const itemComments = useSelector((state) => state.comments[parentId]);

  React.useEffect(() => {
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
        <Header.Subheader>
          Комменты которые загружаются только верхние, вложенные загружаются при клике
        </Header.Subheader>
      </Header>
      <Button
        content='Update comments'
        primary
        loading={itemComments?.updating}
        onClick={handleUpdateCommentsClick}
      />
      <Divider />
      <CommentsContainer parentId={parentId} />
    </Segment>
  );
}

export default NewsItemsComments;
