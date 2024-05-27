import { FC } from "react";
import { NewsArticle } from "../types";
import ArticleCard from "./ArticleCard";
import { Col } from "antd";

interface ArticleFeedProps {
  articles: NewsArticle[];
}

const ArticleFeed: FC<ArticleFeedProps> = ({ articles }) => {
  const renderNews = () => {
    return articles.map((item: NewsArticle) => {
      return (
        <Col span={8} key={item.id}>
          <ArticleCard source={item} ></ArticleCard>
        </Col>
      );
    });
  };

  return renderNews();
};

export default ArticleFeed;
