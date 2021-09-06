import React from 'react';
import { Button, Comment } from 'semantic-ui-react';

import avatar from '../../images/elliot.jpg';
import { getCount } from '../../utils/getCount';

function CommentsList({ comments, showReplies, onShowRepliesClick }) {
  return (
    <Comment.Group>
      {comments.map(({ data, kids }) => {
        const { id, by, time, text } = data;
        const kidsCount = getCount(kids);
        return (
          <Comment key={id}>
            <Comment.Avatar src={avatar} />
            <Comment.Content>
              <Comment.Author as='a'>{by}</Comment.Author>
              <Comment.Metadata>
                {new Date(time * 1000).toLocaleString()}
              </Comment.Metadata>
              <Comment.Text>
                {data.deleted && 'deleted'}
                <div dangerouslySetInnerHTML={{ __html: text }} />
              </Comment.Text>

              {kids && (
                <Button size='mini' compact onClick={onShowRepliesClick(id)}>
                  {showReplies[id] ? 'Hide riplies' : 'Show replies'} ({kidsCount})
                </Button>
              )}
            </Comment.Content>

            {kids && showReplies[id] && (
              <CommentsList
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

export default CommentsList;
