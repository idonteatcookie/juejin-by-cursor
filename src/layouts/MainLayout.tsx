import React from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import ArticleList from '../components/ArticleList';
import RightSidebar from '../components/RightSidebar';

const LayoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 0;
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const MainContent = styled.div`
  width: 720px;
  min-width: 720px;
`;

const LeftSidebarWrapper = styled.div`
  width: 180px;
  min-width: 180px;
`;

const RightSidebarWrapper = styled.div`
  width: 260px;
  min-width: 260px;
`;

const MainLayout: React.FC = () => {
  return (
    <LayoutContainer>
      <LeftSidebarWrapper>
        <Sidebar />
      </LeftSidebarWrapper>
      <MainContent>
        <ArticleList />
      </MainContent>
      <RightSidebarWrapper>
        <RightSidebar />
      </RightSidebarWrapper>
    </LayoutContainer>
  );
};

export default MainLayout; 