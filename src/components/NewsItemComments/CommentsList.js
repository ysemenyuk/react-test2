import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Button, Loader, Comment, Message, Header } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import avatar from '../../images/elliot.jpg';
import { getComments, updateComments } from '../../redux/actions/commentsActions';

function Comments({ parentId }) {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments[parentId]);
  const [showReplies, setShowReplies] = useState({});

  useEffect(() => {
    comments ? dispatch(updateComments(parentId)) : dispatch(getComments(parentId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useEffect]);

  const handleShowRepliesClick = (id) => () => {
    setShowReplies((state) => ({ ...state, [id]: true }));
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
        const isReplies = item.kids && !_.isEmpty(item.kids);
        return (
          <Comment key={item.id}>
            <Comment.Avatar src={avatar} />
            <Comment.Content>
              <Comment.Author as='a'>{item.by}</Comment.Author>
              <Comment.Metadata>{new Date(item.time * 1000).toLocaleString()}</Comment.Metadata>
              <Comment.Text>
                {item.deleted && 'deleted'}
                <div dangerouslySetInnerHTML={{ __html: item.text }} />
              </Comment.Text>
              {isReplies && (
                <>
                  {showReplies[item.id] ? (
                    <Header as='h5' dividing>
                      Replies
                    </Header>
                  ) : (
                    <Button size='mini' compact onClick={handleShowRepliesClick(item.id)}>
                      Show replies ({item.kids.length})
                    </Button>
                  )}
                </>
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
