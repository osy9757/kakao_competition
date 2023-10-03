import React, { useState } from 'react';
import styled from 'styled-components';
import UserInfo from '../components/pages/mypage/UserInfo';
import Navigation from '../components/pages/mypage/Navigation';
import LabelContainer from '../components/pages/mypage/LabelContainer';
import Content from '../components/pages/mypage/Content';
import FAQ from '../components/pages/mypage/FAQ';
import TermsofService from '../components/pages/mypage/TermsofService';
import UserImage from '../components/pages/mypage/UserImage';


const Container = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh; 
`;

const GridContainer = styled('div')`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 16px;
  width: 100%; 
  height: 90%;
  max-width: 1500px; 
`;

const RightGrid = styled('div')`
  display: grid;
  grid-template-rows: 1fr 6fr;
  gap: 16px;
`;

const TopGrid = styled('div')`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 16px;
`;

const MyPage: React.FC = () => {
  const [selectedLabel, setSelectedLabel] = useState('내 정보');

  const renderContent = () => {
    switch (selectedLabel) {
      case '내 정보':
        return <UserInfo />;
      case '좋아요 누른 사진':
        return <UserImage />;
      case '약관':
        return <TermsofService />;
      case 'FAQ':
        return <FAQ />;
      default:
        return <UserInfo />;
    }
  };

  return (
    <Container>
      <GridContainer>
        <Navigation onSelect={setSelectedLabel} />
        <RightGrid>
          <LabelContainer label={selectedLabel} />
          <TopGrid>
            <Content />
            {renderContent()}
          </TopGrid>          
        </RightGrid>
      </GridContainer>
    </Container>
  );
};


export default MyPage;
