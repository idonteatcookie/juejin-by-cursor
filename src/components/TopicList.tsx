import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SyncOutlined } from '@ant-design/icons';
import { fetchHotTopics } from '../utils/mock';

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

const Title = styled.div`
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

const TopicItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TopicItem = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  text-decoration: none;
  padding: 4px 8px;
  margin: 0 -8px;
  border-radius: 4px;

  &:hover {
    .topic-name {
      color: #1e80ff;
    }
  }
`;

const RecommendBadge = styled.div`
  width: 16px;
  height: 16px;
  background: #1e80ff;
  border-radius: 2px;
  color: #fff;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const TopicContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TopicName = styled.div`
  font-size: 14px;
  color: #1d2129;
  transition: color 0.2s;
`;

const TopicCount = styled.div`
  font-size: 12px;
  color: #86909c;
`;

interface Topic {
  theme: {
    name: string;
    hot: number;
    theme_id: string;
  };
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'm';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'k';
  }
  return num.toString();
};

const TopicList: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const response = await fetchHotTopics();
        if (response.err_no === 0 && response.data) {
          setTopics(response.data.slice(0, 5));
        }
      } catch (error) {
        console.error('Failed to load topics:', error);
      }
    };

    loadTopics();
  }, []);

  return (
    <Card>
      <Header>
        <Title>推荐话题</Title>
        <RefreshButton>
          <SyncOutlined />
          换一换
        </RefreshButton>
      </Header>
      <TopicItems>
        {topics.map((topic, index) => (
          <TopicItem 
            key={index}
            href={`https://juejin.cn/pin/topic/${topic.theme.theme_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <RecommendBadge>荐</RecommendBadge>
            <TopicContent>
              <TopicName className="topic-name">#{topic.theme.name}#</TopicName>
              <TopicCount>{formatNumber(topic.theme.hot)}</TopicCount>
            </TopicContent>
          </TopicItem>
        ))}
      </TopicItems>
    </Card>
  );
};

export default TopicList; 