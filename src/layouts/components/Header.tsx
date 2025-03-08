import React from 'react';
import { Layout, Input } from 'antd';
import styled from 'styled-components';
import { GithubOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Search } = Input;

const StyledHeader = styled(AntHeader)`
  background: #fff;
  padding: 0;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 100%;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-right: 40px;
`;

const NavMenu = styled.div`
  display: flex;
  gap: 20px;
`;

const Header = () => {
  return (
    <StyledHeader>
      <HeaderContent>
        <Logo>稀土掘金</Logo>
        <NavMenu>
          <span>首页</span>
          <span>沸点</span>
          <span>课程</span>
          <span>直播</span>
          <span>活动</span>
        </NavMenu>
        <Search
          placeholder="搜索稀土掘金"
          style={{ width: 300, margin: '0 40px' }}
        />
        <div style={{ marginLeft: 'auto' }}>
          <GithubOutlined style={{ fontSize: 20, marginRight: 20 }} />
          <span>登录</span>
        </div>
      </HeaderContent>
    </StyledHeader>
  );
};

export default Header; 