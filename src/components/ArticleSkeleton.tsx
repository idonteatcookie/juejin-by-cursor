import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const SkeletonWrapper = styled.div`
  padding: 12px 0;
  height: 100px;
  display: flex;
  border-bottom: 1px solid #e4e6eb;
`;

const SkeletonContent = styled.div`
  flex: 1;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SkeletonBase = styled.div`
  background: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 100%;
  animation: ${shimmer} 1s linear infinite forwards;
`;

const SkeletonTitle = styled(SkeletonBase)`
  height: 24px;
  width: 50%;
  border-radius: 4px;
`;

const SkeletonBrief = styled(SkeletonBase)`
  height: 16px;
  width: 100%;
  margin: 12px 0;
  border-radius: 4px;
`;

const SkeletonInfo = styled(SkeletonBase)`
  height: 16px;
  width: 60%;
  border-radius: 4px;
`;

const SkeletonImage = styled(SkeletonBase)`
  width: 120px;
  height: 80px;
  border-radius: 4px;
  flex-shrink: 0;
  align-self: center;
`;

const ArticleSkeleton: React.FC = () => {
  return (
    <SkeletonWrapper>
      <SkeletonContent>
        <SkeletonTitle />
        <SkeletonBrief />
        <SkeletonInfo />
      </SkeletonContent>
      <SkeletonImage />
    </SkeletonWrapper>
  );
};

export default ArticleSkeleton; 