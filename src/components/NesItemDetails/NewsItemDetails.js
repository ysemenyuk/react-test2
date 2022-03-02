import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

function NewsItemDetails({ item }) {
  const { title, url, by, time } = item;

  return (
    <>
      <Header as='h2' dividing>
        <Icon name='newspaper' />
        <Header.Content>{title}</Header.Content>
      </Header>
      <p>
        url{' '}
        <a open='_new_blanck' href={url}>
          {url}
        </a>
      </p>
      <p>by {by}</p>
      <p>at {new Date(time * 1000).toLocaleString()}</p>
    </>
  );
}

export default React.memo(NewsItemDetails);
