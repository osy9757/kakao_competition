import React from 'react';
import styled from 'styled-components';

const UserInfoContainer = styled('div')`
  padding: 16px;
  border: 1px solid #ccc;
`;

const UserInfo: React.FC = () => {
    
  return (
    <UserInfoContainer>
      <div>FAQ</div>
    </UserInfoContainer>
  );
};

export default UserInfo;
