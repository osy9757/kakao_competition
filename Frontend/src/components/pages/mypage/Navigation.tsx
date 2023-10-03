import React from 'react';
import styled from 'styled-components';

const NavigationContainer = styled('div')`
  padding: 16px;
  border: none;  
  border-radius: 8px;  
  background-color: #FFFFFF;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const RowWithLogo = styled('div')`
  display: flex;
  align-items: center;
  gap: 16px; 
  padding: 8px 16px;
`;

const Logo = styled.img<LogoProps>`
  width: ${props => props.width || '30px'};
  height: ${props => props.height || '30px'};
`;

const ServiceName = styled('h2')`
  margin: 0;
  
`;

const NavLink = styled('div')`
  margin: 8px 0;
  cursor: pointer;
  padding: 8px 30px;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

interface NavigationProps {
  onSelect: (label: string) => void;
}

interface LogoProps {
    width?: string;
    height?: string;
  }
  

  const Navigation: React.FC<NavigationProps> = ({ onSelect }) => {
    return (
      <NavigationContainer>
        <RowWithLogo>
          <Logo src="/logo192.png" alt="Service Logo" />
          <ServiceName>Service 이름</ServiceName>
        </RowWithLogo>
        <RowWithLogo as={NavLink} onClick={() => onSelect('내정보')}>
          <Logo src="/logo192.png" alt="내정보 Logo" width="20px" height="20px" />
          내정보
        </RowWithLogo>
        <RowWithLogo as={NavLink} onClick={() => onSelect('좋아요 누른 사진')}>
          <Logo src="/logo192.png" alt="좋아요 누른 사진 Logo" width="20px" height="20px" />
          좋아요 누른 사진
        </RowWithLogo>
        <RowWithLogo as={NavLink} onClick={() => onSelect('FAQ')}>
          <Logo src="/logo192.png" alt="FAQ Logo" width="20px" height="20px" />
          FAQ
        </RowWithLogo>
        <RowWithLogo as={NavLink} onClick={() => onSelect('약관')}>
          <Logo src="/logo192.png" alt="약관 Logo" width="20px" height="20px" />
          약관
        </RowWithLogo>
      </NavigationContainer>
    );
  };

export default Navigation;
