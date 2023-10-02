import React from 'react';
import styled from 'styled-components';

const NavigationContainer = styled('div')`
  padding: 16px;
  border: 1px solid #ccc;
`;

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      {/* Add navigation items here */}
      <div>좋아요 누른 사진</div>
      <div>FAQ</div>
      <div>약관</div>
      {/* ... */}
    </NavigationContainer>
  );
};

export default Navigation;
