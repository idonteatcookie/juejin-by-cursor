import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 16px;
`;

const SignInInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const DaysInfo = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-size: 16px;
  font-weight: 500;
  color: #1d2129;

  .days-count {
    color: #1e80ff;
  }
`;

const SubText = styled.div`
  color: #86909c;
  font-size: 12px;
`;

const SignInButton = styled.button`
  height: 32px;
  padding: 0 12px;
  border: 1px solid rgba(30, 128, 255, 0.3);
  border-radius: 4px;
  color: #1e80ff;
  background: rgba(30, 128, 255, 0.05);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(30, 128, 255, 0.1);
  }
`;

const SignInCard: React.FC = () => {
  return (
    <Card>
      <SignInInfo>
        <TextContainer>
          <DaysInfo>
            <span>连续签到</span>
            <span className="days-count">140</span>
            <span>天</span>
          </DaysInfo>
          <SubText>点亮在社区的每一天</SubText>
        </TextContainer>
        <SignInButton>已签到</SignInButton>
      </SignInInfo>
    </Card>
  );
};

export default SignInCard; 