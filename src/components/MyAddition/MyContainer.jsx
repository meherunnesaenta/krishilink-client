import React from 'react';

const MyContainer = ({className,children}) => {
  return (
    <div className={`container mx-auto ${className}`} >
        {children}
    </div>
  );
};

export default MyContainer;