import React from 'react';
import styled from 'styled-components';
import SignInCard from './SignInCard';
import ArticleRanking from './ArticleRanking';
import AuthorRanking from './AuthorRanking';
import TopicList from './TopicList';

const SidebarContainer = styled.div`
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Advertisement = styled.a`
  display: block;
  margin-bottom: 16px;
  position: relative;
  
  img {
    width: 260px;
    height: 120px;
    border-radius: 4px;
    object-fit: cover;
  }
`;

const AdLabel = styled.span`
  position: absolute;
  right: 4px;
  bottom: 4px;
  padding: 0 4px;
  height: 16px;
  line-height: 16px;
  border-radius: 2px;
  font-size: 12px;
  color: #fff;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const RightSidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <SignInCard />
      <ArticleRanking />
      <Advertisement 
        href="https://juejin.cn/user/3263006241480605"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img 
          src="https://p6-passport.byteacctimg.com/img/user-avatar/eda8490a0609d437f24c116bf72df379~180x180.awebp"
          alt="广告"
        />
        <AdLabel>广告</AdLabel>
      </Advertisement>
      <AuthorRanking />
      <TopicList />
    </SidebarContainer>
  );
};

export default RightSidebar; 