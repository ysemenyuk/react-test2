import React from 'react';
import { List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function NewsList({ list }) {
  return (
    <List divided relaxed>
      {list.map((item) => {
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
  );
}

export default React.memo(NewsList);
