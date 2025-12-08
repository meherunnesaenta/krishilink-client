import React, { use } from 'react';
import { Navigate, useLocation,  } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import Loading from '../Components/Loading/Loading';

const PrivateRoute = ({children}) => {
    const {user,loading}=use(AuthContext);
    const location=useLocation();

    if(loading){
        return <Loading></Loading>
    }
    if(user && user?.email){
        return children
    }
  return (
    <Navigate state={location.pathname} to='/login'></Navigate>
  );
};

export default PrivateRoute;