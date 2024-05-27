import '../styles/ArticleCard.scss';
import { Card } from 'antd';
import { FC } from 'react';
import { NewsArticle } from '../types';
import { format } from 'date-fns';

const { Meta } = Card;

interface ArticleCardProps {
  source: NewsArticle;
}

const ArticleCard: FC<ArticleCardProps> = ({ source }) => (
  <Card
    size="default"
    hoverable
    style={{ height: 400 }}
    cover={<img alt="example" style={{ height: 150 }} src={source.imgURL} />}
  >
    <Meta title={source.title} description={source.description} />
    <p>Published On: {format(source?.publishedOn, 'do MMM yyyy')}</p>
  </Card>
);

export default ArticleCard;
