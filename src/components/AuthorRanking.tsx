import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { UserOutlined, RightOutlined } from '@ant-design/icons';
import { fetchQualityAuthors } from '../utils/mock';

const Card = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 8px;
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: #00b96b;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1d2129;
`;

const Divider = styled.div`
  height: 1px;
  background: #e4e6eb;
  margin: 0 -16px 12px;
`;

const AuthorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 8px;
`;

const AuthorItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  margin: 0 -8px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f7f8fa;
  }
`;

const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const AuthorName = styled.div`
  font-size: 14px;
  color: #1d2129;
  font-weight: 400;
`;

const AuthorTitle = styled.div`
  font-size: 12px;
  color: #86909c;
`;

const FollowButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  color: #1e80ff;
  cursor: pointer;
  font-size: 13px;
  transition: color 0.2s;

  &:hover {
    color: #1171ee;
  }
`;

const ViewMore = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #86909c;
  font-size: 13px;
  text-decoration: none;
  padding: 8px 0;
  margin: 0 -16px -16px;
  border-top: 1px solid #e4e6eb;

  &:hover {
    color: #86909c;
  }
`;

interface Author {
  user_info: {
    user_id: string;
    user_name: string;
    job_title: string;
    company: string;
    avatar_large: string;
  };
}

const AuthorRanking: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const response = await fetchQualityAuthors();
        if (response.err_no === 0 && response.data?.user_rank_list) {
          setAuthors(response.data.user_rank_list.slice(0, 5));
        }
      } catch (error) {
        console.error('Failed to load authors:', error);
      }
    };

    loadAuthors();
  }, []);

  const getAuthorDescription = (jobTitle?: string, company?: string) => {
    if (!jobTitle && !company) return "作者暂无简介";
    return `${jobTitle || ""}${company ? ` @ ${company}` : ""}`;
  };

  return (
    <Card>
      <Header>
        <IconWrapper>
          <UserOutlined />
        </IconWrapper>
        <Title>作者榜</Title>
      </Header>
      <Divider />
      <AuthorList>
        {authors.map(author => (
          <AuthorItem key={author.user_info.user_id}>
            <Avatar 
              src={author.user_info.avatar_large} 
              alt={author.user_info.user_name}
            />
            <AuthorInfo>
              <AuthorName>{author.user_info.user_name}</AuthorName>
              <AuthorTitle>
                {getAuthorDescription(author.user_info.job_title, author.user_info.company)}
              </AuthorTitle>
            </AuthorInfo>
            <FollowButton>+ 关注</FollowButton>
          </AuthorItem>
        ))}
      </AuthorList>
      <ViewMore href="/author-rank">
        <span>完整榜单</span>
        <RightOutlined />
      </ViewMore>
    </Card>
  );
};

export default AuthorRanking; 