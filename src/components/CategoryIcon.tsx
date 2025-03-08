import React from 'react';
import styled from 'styled-components';
import { 
  BookOutlined, 
  AppstoreOutlined,
  CodeOutlined,
  AndroidOutlined,
  AppleOutlined,
  RobotOutlined,
  ToolOutlined,
  UserOutlined,
  ReadOutlined,
  TrophyOutlined,
  HeartOutlined
} from '@ant-design/icons';

const IconWrapper = styled.span<{ isRanking?: boolean }>`
  margin-right: 12px;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: ${props => props.isRanking ? '#fcd54c' : 'inherit'};
`;

const categoryIcons: { [key: string]: React.ReactNode } = {
  follow: <HeartOutlined />,
  comprehensive: <AppstoreOutlined />,
  backend: <CodeOutlined />,
  frontend: <CodeOutlined />,
  android: <AndroidOutlined />,
  ios: <AppleOutlined />,
  ai: <RobotOutlined />,
  freebie: <ToolOutlined />,
  career: <UserOutlined />,
  article: <ReadOutlined />,
  ranking: <TrophyOutlined />
};

interface CategoryIconProps {
  categoryUrl?: string;
  categoryId: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ categoryUrl, categoryId }) => {
  const icon = categoryIcons[categoryUrl || categoryId] || <BookOutlined />;
  const isRanking = categoryId === 'ranking';
  
  return <IconWrapper isRanking={isRanking}>{icon}</IconWrapper>;
};

export default CategoryIcon; 