import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SyncOutlined, FileTextOutlined } from '@ant-design/icons';
import { fetchArticleRank } from '../utils/mock';

const Card = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: #ffb95e;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1d2129;
`;

const RefreshButton = styled.button`
  background: none;
  border: none;
  color: #8a919f;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  padding: 0;

  &:hover {
    color: #1e80ff;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #e4e6eb;
  margin: 0 -16px 12px;
`;

const ArticleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`;

const ArticleItem = styled.div`
  display: flex;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  margin: 0 -8px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f7f8fa;
    
    .title {
      color: #4e5969;
    }
  }
`;

const Rank = styled.div<{ index: number }>`
  font-weight: 500;
  font-size: 14px;
  color: ${props => {
    if (props.index === 0) return '#ff7d00';
    if (props.index === 1) return '#ff9f18';
    if (props.index === 2) return '#ffc300';
    return '#8a919f';
  }};
  min-width: 16px;
  text-align: center;
`;

const ArticleTitle = styled.div`
  font-size: 13px;
  color: #4e5969;
  flex: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;

const ViewMore = styled.a`
  display: block;
  text-align: center;
  color: #86909c;
  font-size: 13px;
  text-decoration: none;
  padding: 12px 0;
  margin: 0 -16px -16px;
  border-top: 1px solid #e4e6eb;

  &:hover {
    color: #86909c;
    background: none;
  }
`;

interface Article {
  content: {
    title: string;
    content_id: string;
  };
}

const ArticleRanking: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await fetchArticleRank();
        if (response.err_no === 0 && response.data) {
          // 从 response.data 中获取文章列表
          setArticles(response.data.slice(0, 50)); // 只取前50条数据
        }
      } catch (error) {
        console.error('Failed to load article ranking:', error);
      }
    };

    loadArticles();
  }, []);

  const handleRefresh = () => {
    const totalPages = Math.ceil(Math.min(articles.length, 50) / pageSize);
    setCurrentPage(prev => (prev + 1) % totalPages);
  };

  const currentArticles = articles.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <Card>
      <Header>
        <TitleWrapper>
          <IconWrapper>
            <FileTextOutlined />
          </IconWrapper>
          <Title>文章榜</Title>
        </TitleWrapper>
        <RefreshButton onClick={handleRefresh}>
          <SyncOutlined />
          换一换
        </RefreshButton>
      </Header>
      <Divider />
      <ArticleList>
        {currentArticles.map((article, index) => (
          <ArticleItem key={article.content.content_id}>
            <Rank index={currentPage * pageSize + index}>
              {currentPage * pageSize + index + 1}
            </Rank>
            <ArticleTitle className="title">
              {article.content.title}
            </ArticleTitle>
          </ArticleItem>
        ))}
      </ArticleList>
      <ViewMore href="/article-rank">查看更多 &gt;</ViewMore>
    </Card>
  );
};

export default ArticleRanking; 