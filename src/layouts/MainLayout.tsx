import React, { useState } from 'react';
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
  // 添加一个 key 来强制重新渲染 ArticleList
  const [articleListKey, setArticleListKey] = useState(0);
  // 控制当前选中的 Tab
  const [activeTab, setActiveTab] = useState('recommend');

  // 处理左侧菜单点击
  const handleCategoryClick = () => {
    setArticleListKey(prev => prev + 1); // 强制重新渲染文章列表
    setActiveTab('recommend'); // 重置为推荐 Tab
  };

  // 处理 Tab 切换
  const handleTabChange = (tab: string) => {
    setArticleListKey(prev => prev + 1); // 强制重新渲染文章列表
    setActiveTab(tab);
  };

  return (
    <LayoutContainer>
      <LeftSidebarWrapper>
        <Sidebar onCategoryClick={handleCategoryClick} />
      </LeftSidebarWrapper>
      <MainContent>
        <ArticleList 
          key={articleListKey}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </MainContent>
      <RightSidebarWrapper>
        <RightSidebar />
      </RightSidebarWrapper>
    </LayoutContainer>
  );
};

export default MainLayout; 