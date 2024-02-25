import React from 'react';
import QRCodeGenerator from "../components/QRCodeGenerator/QRCodeGenerator";
import ClassTable from "../components/ClassTable/ClassTable";


const Dashboard = () => {
    return (
        <div>
            <QRCodeGenerator/>
            <ClassTable/>
        </div>
    );
};

export default Dashboard;