import React from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import ArticleList from '../components/ArticleList';

const LayoutContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  margin: 0 20px;
  min-width: 720px;
  max-width: 960px;
`;

const AsideRight = styled.div`
  width: 240px;
`;

const MainLayout: React.FC = () => {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <ArticleList />
      </MainContent>
      <AsideRight>
        {/* 右侧边栏内容 */}
      </AsideRight>
    </LayoutContainer>
  );
};

export default MainLayout; 