import React from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  flex: 1;
  background: #fff;
  padding: 20px;
  border-radius: 4px;
`;

const MainContent = () => {
  return (
    <ContentWrapper>
      <h2>推荐文章</h2>
      {/* 这里后续可以添加文章列表组件 */}
    </ContentWrapper>
  );
};

export default MainContent; 