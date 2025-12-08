import React from 'react';
import { NavLink } from 'react-router-dom';

const MyNavLink = ({to,className,children}) => {
  return (
    <NavLink to={to} className={({isActive})=>isActive?"text-green-700":`${className} font-semibold`}>
        {children}
    </NavLink>
  );
};

export default MyNavLink;