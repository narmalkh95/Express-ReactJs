import React from 'react';
import QRCodeGenerator from "../components/QRCodeGenerator/QRCodeGenerator";
import ClassTable from "../components/ClassTable/ClassTable";


const Home = () => {
    return (
        <div>
           <QRCodeGenerator/>
            <ClassTable/>
        </div>
    );
};

export default Home;