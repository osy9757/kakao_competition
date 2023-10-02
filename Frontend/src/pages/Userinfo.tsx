import React, { useState } from 'react';
import styled from 'styled-components';
import UserInfo from '../components/pages/mypage/UserInfo';
import Navigation from '../components/pages/mypage/Navigation';
import LabelContainer from '../components/pages/mypage/LabelContainer';
import Content from '../components/pages/mypage/Content';

const Container = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh; 
`;

const GridContainer = styled('div')`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 16px;
  width: 100%; 
  max-width: 2000px; 
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

  return (
    <Container>
      <GridContainer>
        <Navigation onSelect={setSelectedLabel} />
        <RightGrid>
          <LabelContainer label={selectedLabel} />
          <TopGrid>
            <Content />
            <UserInfo />
          </TopGrid>          
        </RightGrid>
      </GridContainer>
    </Container>
  );
};


export default MyPage;
