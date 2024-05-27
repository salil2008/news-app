import { useState } from 'react';
import FilterBar from './FilterBar';
import { FilterQueryProps, NewsArticle } from '../types';
import fetchArticles from '../services/fetchNews';
import ArticleFeed from './ArticleFeed';
import { Row } from 'antd';
import { SpinnerWrapper } from './Spin';

function NewsSearchPage() {
  const [filters, setFilters] = useState<FilterQueryProps>({});
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFilter = async (filterObj: FilterQueryProps) => {
    try {
      setLoading(true);
      setFilters(filterObj);
      const news = await fetchArticles(filterObj);
      setArticles(news);
    } catch (error) {
      console.error(error);
    } finally {
      console.log({ filters });
      setLoading(false);
    }
  };

  return (
    <>
      <p>News Search</p>
      <FilterBar onFilter={handleFilter} />
      <SpinnerWrapper loading={loading}>
        <Row gutter={[16, 16]}>
          <ArticleFeed articles={articles} />
        </Row>
      </SpinnerWrapper>
    </>
  );
}

export default NewsSearchPage;
