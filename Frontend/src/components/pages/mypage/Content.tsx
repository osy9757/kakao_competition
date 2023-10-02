import React from 'react';
import styled from 'styled-components';

const ContentContainer = styled('div')`
  padding: 16px;
  border: 1px solid #ccc;
`;

const Content: React.FC = () => {
  return (
    <ContentContainer>
      {/* Display content based on selected navigation item */}
      {/* For now, it's just a placeholder */}
      <div>Selected Content Goes Here</div>
    </ContentContainer>
  );
};

export default Content;
