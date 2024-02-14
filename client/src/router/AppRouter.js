import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard";
import AppLayout from "../layout/AppLayout";

const AppRouter = () => {
    return (
        <Router>

                <Routes>
                    <Route path="/login" element={<Login />} />

                        <Route exact path='/dashboard' element={
                         <PrivateRoute children={
                             <AppLayout>
                                <Dashboard/>
                             </AppLayout>
                         } requiredRoles={['admin']}/>} />

                </Routes>
        </Router>
    );
};

export default AppRouter;