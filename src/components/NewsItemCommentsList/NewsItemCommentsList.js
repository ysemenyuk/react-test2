/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Button, Segment, Loader, Header, Message, Divider } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import { getCount } from '../../utils/getCount';

import {
  getCommentsList,
  updateCommentsList,
} from '../../redux/actions/commentsListActions';

import CommentsList from './CommentsList';
import { COMMENTS_UPDATE_INTERVAL } from '../../sevices/constants';

function NewsItemCommentsList({ parentId }) {
  const dispatch = useDispatch();
  const itemComments = useSelector((state) => state.commentsList[parentId]);
  const [showReplies, setShowReplies] = useState({});

  React.useEffect(() => {
    itemComments
      ? dispatch(updateCommentsList(parentId))
      : dispatch(getCommentsList(parentId));
  }, [dispatch, parentId]);

  React.useEffect(() => {
    const timerId = setInterval(() => {
      dispatch(updateCommentsList(parentId));
    }, COMMENTS_UPDATE_INTERVAL);
    return () => {
      clearInterval(timerId);
    };
  }, [dispatch, parentId]);

  const handleShowRepliesClick = (id) => () => {
    setShowReplies((state) => ({ ...state, [id]: !state[id] }));
  };

  const handleUpdateCommentsClick = () => {
    dispatch(updateCommentsList(parentId));
  };

  if (!itemComments) return null;

  const { error, loading, updating, data } = itemComments;

  const count = getCount(data);

  return (
    <Segment basic>
      <Header as='h4' dividing>
        Comments ({count})
        <Header.Subheader>
          Комменты которые загружаются сразу все, но вложенные скрыты
        </Header.Subheader>
      </Header>
      <Button
        content='Update comments'
        primary
        loading={updating}
        onClick={handleUpdateCommentsClick}
      />
      <Divider />

      {loading ? (
        <Loader active inline='centered' />
      ) : error ? (
        <Message negative content='Error' />
      ) : (
        <CommentsList
          comments={data}
          showReplies={showReplies}
          onShowRepliesClick={handleShowRepliesClick}
        />
      )}
    </Segment>
  );
}

export default NewsItemCommentsList;
