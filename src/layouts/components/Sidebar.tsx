import React from 'react';
import styled from 'styled-components';

const SidebarWrapper = styled.div`
  width: 240px;
  margin-right: 20px;
`;

const MenuItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f4f5f5;
  }
`;

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <MenuItem>综合</MenuItem>
      <MenuItem>关注</MenuItem>
      <MenuItem>后端</MenuItem>
      <MenuItem>前端</MenuItem>
      <MenuItem>Android</MenuItem>
      <MenuItem>iOS</MenuItem>
      <MenuItem>人工智能</MenuItem>
      <MenuItem>开发工具</MenuItem>
      <MenuItem>代码人生</MenuItem>
    </SidebarWrapper>
  );
};

export default Sidebar; 