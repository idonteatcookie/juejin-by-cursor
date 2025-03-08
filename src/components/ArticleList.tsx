import React, { useState, useEffect, useCallback } from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';
import { EyeOutlined, LikeOutlined } from '@ant-design/icons';
import { fetchArticleList } from '../utils/mock';
import { formatNumber } from '../utils/format';

const ListContainer = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 4px;
  min-width: 700px;
`;

const TabsWrapper = styled(Tabs)`
  .ant-tabs-nav {
    margin: 0;
    padding: 16px 20px 0;
    &::before {
      border-bottom: 1px solid #e4e6eb;
    }
  }
  
  .ant-tabs-tab {
    padding: 12px 0;
    font-size: 16px;
    margin: 0 24px 0 0;
    
    &.ant-tabs-tab-active {
      .ant-tabs-tab-btn {
        color: #1e80ff;
        font-weight: 500;
      }
    }

    &:hover {
      color: #1e80ff;
    }
  }

  .ant-tabs-ink-bar {
    background: #1e80ff;
  }
`;

const ArticleListWrapper = styled.div`
  padding: 0 20px;
`;

const ArticleItem = styled.div`
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #e4e6eb;
  cursor: pointer;

  &:hover {
    h3 {
      color: #1e80ff;
    }
  }
`;

const ArticleContent = styled.div<{ hasCover: boolean }>`
  flex: 1;
  ${props => props.hasCover ? 'margin-right: 20px;' : ''}
`;

const ArticleTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #1d2129;
  margin: 0 0 8px 0;
  line-height: 1.4;
`;

const ArticleBrief = styled.p`
  font-size: 13px;
  color: #86909c;
  margin: 0 0 8px 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const ArticleInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #4e5969;
`;

const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  
  .anticon {
    font-size: 14px;
    margin-right: 4px;
  }
`;

const ArticleTags = styled.div`
  margin-left: auto;
  display: flex;
  gap: 8px;
`;

const Tag = styled.span`
  padding: 0 8px;
  font-size: 12px;
  color: #86909c;
  background: #f2f3f5;
  border-radius: 3px;
  height: 22px;
  line-height: 22px;
`;

const CoverImage = styled.img`
  width: 120px;
  height: 80px;
  border-radius: 4px;
  object-fit: cover;
`;

interface Article {
  item_type: number;
  item_info: {
    article_id: string;
    article_info: {
      title: string;
      brief_content: string;
      cover_image: string;
      view_count: number;
      digg_count: number;
      user_name: string;
    };
    tags: Array<{
      tag_name: string;
    }>;
  };
}

const ArticleList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('recommend');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadArticles = useCallback(async (isRefresh = false) => {
    try {
      setLoading(true);
      const response = await fetchArticleList(isRefresh ? 1 : page);
      const newArticles = response.data;
      
      setArticles(prev => isRefresh ? newArticles : [...prev, ...newArticles]);
      setPage(prev => isRefresh ? 1 : prev + 1);
    } catch (error) {
      console.error('Failed to load articles:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadArticles(true);
  }, [activeTab]);

  const handleScroll = useCallback((e: Event) => {
    const target = e.target as Document;
    const scrollHeight = Math.max(
      target.documentElement.scrollHeight,
      target.documentElement.clientHeight
    );
    const scrollTop = Math.max(
      target.documentElement.scrollTop,
      target.body.scrollTop
    );
    const clientHeight = target.documentElement.clientHeight;

    if (scrollHeight - scrollTop - clientHeight < 100 && !loading) {
      loadArticles();
    }
  }, [loading, loadArticles]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <ListContainer>
      <TabsWrapper
        activeKey={activeTab}
        onChange={key => setActiveTab(key)}
        items={[
          { key: 'recommend', label: '推荐' },
          { key: 'newest', label: '最新' },
        ]}
      />
      <ArticleListWrapper>
        {articles.map(article => {
          const articleInfo = article?.item_info?.article_info;
          const tags = article?.item_info?.tags || [];
          
          if (!articleInfo) return null;

          return (
            <ArticleItem key={article.item_info.article_id}>
              <ArticleContent hasCover={!!articleInfo.cover_image}>
                <ArticleTitle>{articleInfo.title}</ArticleTitle>
                <ArticleBrief>{articleInfo.brief_content}</ArticleBrief>
                <ArticleInfo>
                  <ArticleMeta>{articleInfo.user_name}</ArticleMeta>
                  <ArticleMeta>
                    <EyeOutlined />
                    {formatNumber(articleInfo.view_count)}
                  </ArticleMeta>
                  <ArticleMeta>
                    <LikeOutlined />
                    {articleInfo.digg_count}
                  </ArticleMeta>
                  <ArticleTags>
                    {tags.map(tag => (
                      <Tag key={tag.tag_name}>{tag.tag_name}</Tag>
                    ))}
                  </ArticleTags>
                </ArticleInfo>
              </ArticleContent>
              {articleInfo.cover_image && (
                <CoverImage 
                  src={articleInfo.cover_image} 
                  alt={articleInfo.title}
                />
              )}
            </ArticleItem>
          );
        })}
      </ArticleListWrapper>
    </ListContainer>
  );
};

export default ArticleList; 