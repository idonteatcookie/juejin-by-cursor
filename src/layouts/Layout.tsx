import { Layout as AntLayout } from 'antd';
import styled from 'styled-components';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

const { Content } = AntLayout;

const StyledLayout = styled(AntLayout)`
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Layout = () => {
  return (
    <StyledLayout>
      <Header />
      <Content>
        <ContentWrapper>
          <Sidebar />
          <MainContent />
        </ContentWrapper>
      </Content>
    </StyledLayout>
  );
};

export default Layout; 