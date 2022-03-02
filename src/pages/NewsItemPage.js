import React, { useEffect } from 'react';
import { Button, Segment, Container, Loader, Message } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getNewsItem, resetNewsItem } from '../redux/actions/newsItemActions';
import NewsItemDetails from '../components/NesItemDetails/NewsItemDetails';
import NewsItemsComments from '../components/NewsItemComments/NewsItemComments';

const newsItemSelector = (state) => state.newsItem;

function NewsItemPage() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const newsItem = useSelector(newsItemSelector);

  useEffect(() => {
    dispatch(getNewsItem(id));

    return () => {
      dispatch(resetNewsItem());
    };
  }, [dispatch, id]);

  if (!newsItem.data.id) return null;

  const { error, loading, data } = newsItem;
  const commentsIds = data.kids;

  return (
    <Container>
      <Segment basic>
        <Button content='Back to all news' primary as={Link} to='/news' />
        {loading ? (
          <Loader active inline='centered' />
        ) : error ? (
          <Message negative content='Error' />
        ) : (
          <NewsItemDetails item={data} />
        )}
      </Segment>
      {commentsIds && <NewsItemsComments parentId={id} />}
    </Container>
  );
}

export default NewsItemPage;
