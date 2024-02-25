import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard";
import AppLayout from "../layout/AppLayout";
import ThankYouPage from "../pages/ThankYouPage/ThankYouPage";
import NotFoundPage from "../pages/404/NotFoundPage";
import {useSelector} from "react-redux";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <Router>

                <Routes>
                    {isAuthenticated ? (
                        <Route path="/login" element={<Navigate to="/dashboard" replace />} />
                    ) : (
                        <Route path="/login" element={<Login />} />
                    )}
                    <Route
                        path="/"
                        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
                    />
                    <Route path="/thank-you" element={<ThankYouPage />} />
                        <Route exact path='/dashboard' element={
                         <PrivateRoute
                             children={
                             <AppLayout>
                                <Dashboard/>
                             </AppLayout>
                         } requiredRoles={['admin']}/>} />
                     <Route path='*' element={<NotFoundPage />} />

                </Routes>
        </Router>
    );
};

export default AppRouter;