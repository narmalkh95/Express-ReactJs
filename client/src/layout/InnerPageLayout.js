import React from 'react';
import Sidebar from "../components/Sidebar/Sidebar";

const InnerPageLayout = ({ children }) => {
    return (
        <div className="container">
            <Sidebar />
            <div className="content">{children}</div>
        </div>
    );
};

export default InnerPageLayout;