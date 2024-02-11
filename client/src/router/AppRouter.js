import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
 import Register from "../pages/Register";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";


const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;