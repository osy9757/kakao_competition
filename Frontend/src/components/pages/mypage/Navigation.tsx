import React from 'react';
import styled from 'styled-components';

const NavigationContainer = styled('div')`
  padding: 16px;
  border: 1px solid #ccc;
`;

interface NavigationProps {
    onSelect: (label: string) => void;
  }

const Navigation: React.FC<NavigationProps> = ({ onSelect }) => {
return (
    <NavigationContainer>
    <div onClick={() => onSelect('service 이름')}>service 이름</div>
    <div onClick={() => onSelect('내정보')}>내정보</div>
    <div onClick={() => onSelect('좋아요 누른 사진')}>좋아요 누른 사진</div>
    <div onClick={() => onSelect('FAQ')}>FAQ</div>
    <div onClick={() => onSelect('약관')}>약관</div>
    </NavigationContainer>
);
};

export default Navigation;
