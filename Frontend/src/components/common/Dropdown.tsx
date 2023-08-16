import React from 'react';
import '../../styles/common/Dropdown.css';

type DropdownProps = {
  visibility: boolean;
  children: React.ReactNode;
};

const Dropdown: React.FC<DropdownProps> = ({ visibility, children }) => {
  return (
    <div className={`components-dropdown ${visibility ? 'active' : ''}`}>
      {children}
    </div>
  );
};

export default Dropdown;
