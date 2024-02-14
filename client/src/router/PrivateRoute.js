import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, requiredRoles }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isLoading = useSelector((state) => state.auth.loading);
    const isError = useSelector((state) => state.auth.error);

    // const hasPermission = () => {
    //     if (isLoading || isError) return false;
    //     if (!requiredRoles || requiredRoles.length === 0) return true;
    //
    // };

    if (isError) {
        return <div>{isError}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // if (hasPermission()){
    //     return  children ;
    // }

   return children;
};

export default PrivateRoute;
