import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard";
import AppLayout from "../layout/AppLayout";
import ThankYouPage from "../pages/ThankYouPage/ThankYouPage";
import NotFoundPage from "../pages/404/NotFoundPage";

const AppRouter = () => {
    return (
        <Router>

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/thank-you" element={<ThankYouPage />} />

                        <Route exact path='/dashboard' element={
                         <PrivateRoute children={
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