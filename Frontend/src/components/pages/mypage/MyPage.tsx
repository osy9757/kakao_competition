import React from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import Navigation from './Navigation';
import Content from './Content';

const GridContainer = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;
`;
type MyPageProps = {};

const MyPage: React.FunctionComponent<MyPageProps> = (props) => {
    return (
    <GridContainer>
      <Navigation />
      <UserInfo />
      {/* You can add more sections here if required */}
      <Content />
    </GridContainer>
  );
};

export default MyPage;
