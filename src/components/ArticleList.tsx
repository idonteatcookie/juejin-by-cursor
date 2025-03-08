import React, { useState, useEffect, useCallback } from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';
import { EyeOutlined, LikeOutlined } from '@ant-design/icons';
import { fetchArticleList } from '../utils/mock';
import { formatNumber } from '../utils/format';
import ArticleSkeleton from './ArticleSkeleton';

const ListContainer = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 4px;
  width: 100%;
  min-width: 0;
`;

const TabsWrapper = styled(Tabs)`
  .ant-tabs-nav {
    margin: 0;
    height: 50px;
    padding: 0 20px;
    &::before {
      border-bottom: 1px solid #e4e6eb;
    }
  }
  
  .ant-tabs-tab {
    padding: 12px 0;
    font-size: 16px;
    margin: 0 12px 0 0;
    color: #86909c;
    position: relative;
    
    &.ant-tabs-tab-active {
      .ant-tabs-tab-btn {
        color: #1d2129;
        font-weight: 500;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 15px;
        height: 3px;
        background: #1e80ff;
        border-radius: 1px;
      }
    }

    &:hover {
      color: #1d2129;
    }
  }

  .ant-tabs-ink-bar {
    display: none;
  }
`;

const ArticleListWrapper = styled.div`
  padding: 0 20px;
`;

const ArticleItem = styled.a`
  display: flex;
  padding: 12px 0;
  height: 100px;
  border-bottom: 1px solid #e4e6eb;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  &:hover {
    h3 {
      color: #1e80ff;
    }
  }
`;

const ArticleContent = styled.div<{ hasCover: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${props => props.hasCover ? 'margin-right: 20px;' : ''}
`;

const ArticleTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #1d2129;
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;

const ArticleBrief = styled.p`
  font-size: 13px;
  color: #86909c;
  margin: 4px 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  flex: 1;
`;

const ArticleInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #4e5969;
`;

const AuthorName = styled.div`
  color: #4e5969;
  font-weight: 500;
  margin-right: 20px;
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
  align-self: center;
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

// 添加一个处理图片URL的函数
const processCoverImage = (url: string) => {
  if (!url) return '';
  
  // 如果URL包含 '~tplv-k3u1fbpfcp-jj-mark' 这样的标记，需要处理
  if (url.includes('~tplv-k3u1fbpfcp-jj-mark')) {
    return url.split('#')[0]; // 移除URL中的hash部分
  }
  
  return url;
};

interface ArticleListProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ activeTab, onTabChange }) => {
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

  // 修改 Tab 切换处理函数
  const handleTabChange = (key: string) => {
    onTabChange(key); // 通知父组件 Tab 变化
  };

  // 监听 activeTab 变化，重新加载数据
  useEffect(() => {
    setArticles([]); // 清空当前文章列表
    setPage(1); // 重置页码
    loadArticles(true); // 重新加载数据
  }, [activeTab]); // 添加 activeTab 作为依赖

  // 首次加载数据
  useEffect(() => {
    loadArticles(true);
  }, []);

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
        onChange={handleTabChange}
        animated={false}
        items={[
          { key: 'recommend', label: '推荐' },
          { key: 'newest', label: '最新' },
        ]}
      />
      <ArticleListWrapper>
        {loading && articles.length === 0 ? (
          // 初始加载或切换 Tab 时显示骨架屏
          <>
            <ArticleSkeleton />
            <ArticleSkeleton />
            <ArticleSkeleton />
            <ArticleSkeleton />
            <ArticleSkeleton />
          </>
        ) : (
          articles.map(article => {
            const articleInfo = article?.item_info?.article_info;
            const authorInfo = article?.item_info?.author_user_info;
            const tags = article?.item_info?.tags || [];
            
            if (!articleInfo || !authorInfo) return null;

            const coverImage = processCoverImage(articleInfo.cover_image);

            return (
              <ArticleItem 
                key={article.item_info.article_id}
                href={`https://juejin.cn/post/${article.item_info.article_id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArticleContent hasCover={!!coverImage}>
                  <ArticleTitle>{articleInfo.title}</ArticleTitle>
                  <ArticleBrief>{articleInfo.brief_content}</ArticleBrief>
                  <ArticleInfo>
                    <AuthorName>{authorInfo.user_name}</AuthorName>
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
                {coverImage && (
                  <CoverImage 
                    src={coverImage}
                    alt={articleInfo.title}
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = 'none';
                    }}
                  />
                )}
              </ArticleItem>
            );
          })
        )}
        {loading && articles.length > 0 && (
          // 加载更多时显示骨架屏
          <ArticleSkeleton />
        )}
      </ArticleListWrapper>
    </ListContainer>
  );
};

export default ArticleList; 