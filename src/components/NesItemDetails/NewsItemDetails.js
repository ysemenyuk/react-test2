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
        <a href={url}>{url}</a>
      </p>
      <p>
        by {by} at {new Date(time * 1000).toLocaleString()}
      </p>
    </>
  );
}

export default NewsItemDetails;
