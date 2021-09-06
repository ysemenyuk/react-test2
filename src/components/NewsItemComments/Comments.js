/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Button, Loader, Comment, Message } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import avatar from '../../images/elliot.jpg';

import { getComments, updateComments } from '../../redux/actions/commentsActions';

function Comments({ parentId }) {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments[parentId]);
  const [showReplies, setShowReply] = useState({});

  React.useEffect(() => {
    comments ? dispatch(updateComments(parentId)) : dispatch(getComments(parentId));
  }, []);

  const handleShowRepliesClick = (id) => () => {
    setShowReply((state) => ({ ...state, [id]: !state[id] }));
  };

  if (!comments) return null;

  const { error, loading, data } = comments;

  return loading ? (
    <Loader active inline='centered' />
  ) : error ? (
    <Message negative content='Error' />
  ) : (
    <Comment.Group>
      {data.map((item) => {
        if (!item) return null;
        const isReplies = item.kids && item.kids.length !== 0;
        return (
          <Comment key={item.id}>
            <Comment.Avatar src={avatar} />
            <Comment.Content>
              <Comment.Author as='a'>{item.by}</Comment.Author>
              <Comment.Metadata>
                {new Date(item.time * 1000).toLocaleString()}
              </Comment.Metadata>
              <Comment.Text>
                {item.deleted && 'deleted'}
                <div dangerouslySetInnerHTML={{ __html: item.text }} />
              </Comment.Text>
              {isReplies && (
                <Button size='mini' compact onClick={handleShowRepliesClick(item.id)}>
                  {showReplies[item.id] ? 'Hide riplies' : 'Show replies'} (
                  {item.kids.length})
                </Button>
              )}
            </Comment.Content>

            {isReplies && showReplies[item.id] && <Comments parentId={item.id} />}
          </Comment>
        );
      })}
    </Comment.Group>
  );
}

export default Comments;
