import React from 'react';
import { Layout, Input, Button, Badge, Dropdown } from 'antd';
import styled from 'styled-components';
import { BellOutlined, CaretDownOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Search } = Input;

const StyledHeader = styled(AntHeader)`
  background: #fff;
  padding: 0;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  height: 60px;
  line-height: 60px;
`;

const HeaderContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 24px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-right: 32px;
  cursor: pointer;
  height: 100%;

  img {
    height: 22px;
    width: auto;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 20px;
`;

const MenuItem = styled.span<{ active?: boolean }>`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 14px;
  color: ${props => props.active ? '#1e80ff' : '#86909c'};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #1e80ff;
  }

  ${props => props.active && `
    color: #1e80ff;
  `}
`;

const NewBadge = styled.span`
  position: absolute;
  top: 14px;
  right: 0;
  padding: 0 6px;
  height: 16px;
  line-height: 16px;
  background: #f64242;
  border-radius: 8px;
  font-size: 12px;
  color: #fff;
  transform: scale(0.9);
`;

const SearchWrapper = styled.div`
  margin: 0 16px;
  width: 300px;
  display: flex;
  align-items: center;

  .ant-input-search {
    .ant-input-wrapper {
      height: 34px;
      
      .ant-input {
        height: 34px;
        line-height: 34px;
        border-radius: 4px;
        padding: 0 12px;
        font-size: 14px;
        
        &::placeholder {
          color: #8a919f;
        }
        
        &:hover, &:focus {
          border-color: #1e80ff;
        }
      }

      .ant-input-search-button {
        height: 34px;
        width: 34px;
        border-radius: 0 4px 4px 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .ant-input-clear-icon {
        margin-top: -1px;
      }

      .ant-input-affix-wrapper {
        padding: 0;
        height: 34px;
        line-height: 34px;

        input {
          height: 32px;
          line-height: 32px;
        }
      }
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-left: auto;
`;

const CreatorButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 32px;
  padding: 0 12px;
  border-radius: 4px;
  
  .anticon {
    font-size: 12px;
  }
`;

const VIPIcon = styled.span`
  color: #f7c94f;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
`;

const NotificationDropdownWrapper = styled.div`
  width: 165px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`;

const NotificationMenuItem = styled.div`
  height: 40px;
  line-height: 40px;
  padding: 0 16px;
  font-size: 14px;
  color: #1d2129;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: #f4f5f5;
  }
`;

const NotificationCount = styled.span`
  font-size: 13px;
  color: #8a919f;
`;

const Header = () => {
  const creatorItems = [
    { key: 'write', label: '写文章' },
    { key: 'create', label: '发沸点' },
    { key: 'record', label: '写笔记' },
  ];

  const notificationItems = [
    {
      key: 'comment',
      label: (
        <NotificationMenuItem>
          评论
          <NotificationCount>99+</NotificationCount>
        </NotificationMenuItem>
      ),
    },
    {
      key: 'like',
      label: (
        <NotificationMenuItem>
          赞和收藏
          <NotificationCount>99+</NotificationCount>
        </NotificationMenuItem>
      ),
    },
    {
      key: 'follow',
      label: (
        <NotificationMenuItem>
          新增关注
          <NotificationCount>99+</NotificationCount>
        </NotificationMenuItem>
      ),
    },
    {
      key: 'system',
      label: (
        <NotificationMenuItem>
          系统通知
          <NotificationCount>99+</NotificationCount>
        </NotificationMenuItem>
      ),
    },
  ];

  return (
    <StyledHeader>
      <HeaderContent>
        <Logo>
          <img 
            src="https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg" 
            alt="稀土掘金"
          />
        </Logo>
        <NavMenu>
          <MenuItem active>首页</MenuItem>
          <MenuItem>
            AI Coding
            <NewBadge>NEW</NewBadge>
          </MenuItem>
          <MenuItem>沸点</MenuItem>
          <MenuItem>课程</MenuItem>
          <MenuItem>直播</MenuItem>
          <MenuItem>活动</MenuItem>
          <MenuItem>AI刷题</MenuItem>
          <MenuItem>APP</MenuItem>
          <MenuItem>插件</MenuItem>
        </NavMenu>
        <SearchWrapper>
          <Search
            placeholder="搜索稀土掘金"
            allowClear
          />
        </SearchWrapper>
        <RightSection>
          <Dropdown
            menu={{ items: creatorItems }}
            placement="bottom"
          >
            <CreatorButton type="primary">
              创作者中心
              <CaretDownOutlined />
            </CreatorButton>
          </Dropdown>
          <VIPIcon>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.29-5.57a1.41 1.41 0 0 0 1.42-1.41c0-.78-.64-1.41-1.42-1.41-.78 0-1.42.63-1.42 1.41 0 .78.64 1.41 1.42 1.41zm4.58 0a1.41 1.41 0 0 0 1.42-1.41c0-.78-.64-1.41-1.42-1.41-.78 0-1.42.63-1.42 1.41 0 .78.64 1.41 1.42 1.41zM12 6.92c-2.33 0-4.23 1.89-4.23 4.23h8.46c0-2.34-1.9-4.23-4.23-4.23z"/>
            </svg>
          </VIPIcon>
          <Dropdown
            menu={{ items: notificationItems }}
            placement="bottomRight"
            trigger={['hover']}
            dropdownRender={(menu) => (
              <NotificationDropdownWrapper>
                {menu}
              </NotificationDropdownWrapper>
            )}
          >
            <span>
              <Badge count={99} size="small">
                <BellOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
              </Badge>
            </span>
          </Dropdown>
          <UserAvatar 
            src="https://p6-passport.byteacctimg.com/img/user-avatar/eda8490a0609d437f24c116bf72df379~180x180.awebp" 
            alt="user avatar"
          />
        </RightSection>
      </HeaderContent>
    </StyledHeader>
  );
};

export default Header; 