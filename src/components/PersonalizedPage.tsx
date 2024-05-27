import { useEffect, useRef, useState } from 'react';
import { usePreferences } from '../context/PreferencesProvider';
import fetchArticles from '../services/fetchNews';
import { Row } from 'antd';
import { NewsArticle } from '../types';
import ArticleFeed from './ArticleFeed';
import useInfiniteScroll from '../services/useInfiniteScroll';
import { Spinner } from './Spin';

function PersonalizedPage() {
  const { preferences } = usePreferences();
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchPersonalizedNews);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [page, setPage] = useState<number>(1);
  const sendRequestRef = useRef(true);

  async function fetchPersonalizedNews() {
    try {
      if (sendRequestRef.current === true) {
        sendRequestRef.current = false;
        const response: NewsArticle[] = await fetchArticles({ search: 'latest', page }, preferences);
        setNewsArticles((prevState) => [...prevState, ...response]);
        setPage(page + 1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
      sendRequestRef.current = true;
    }
  }

  useEffect(() => {
    fetchPersonalizedNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row gutter={[16, 16]}>
        <ArticleFeed articles={newsArticles} />
      </Row>
      <Row justify="center">{isFetching && <Spinner />}</Row>
    </>
  );
}

export default PersonalizedPage;
