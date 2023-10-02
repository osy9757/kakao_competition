import React from 'react';
import styled from 'styled-components';

interface LabelContainerProps {
  label: string;
}

const StyledLabelContainer = styled('div')`
  padding: 16px;
  border: 1px solid #ccc;
`;

const LabelContainer: React.FC<LabelContainerProps> = ({ label }) => {
  return (
    <StyledLabelContainer>
      {label}
    </StyledLabelContainer>
  );
};

export default LabelContainer;
