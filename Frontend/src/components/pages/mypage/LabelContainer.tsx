import React from 'react';
import styled from 'styled-components';

interface LabelContainerProps {
  label: string;
}

const StyledLabelContainer = styled('div')`
  font-size : 40px;
  padding: 16px;
  border: 1px solid #ccc;
  border: none;  
  border-radius: 8px;  
  background-color: #FFFFFF;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
`;

const LabelContainer: React.FC<LabelContainerProps> = ({ label }) => {
  return (
    <StyledLabelContainer>
      {label}
    </StyledLabelContainer>
  );
};

export default LabelContainer;
