import React from 'react';
import QRCodeGenerator from "../components/QRCodeGenerator/QRCodeGenerator";
import ClassTable from "../components/ClassTable/ClassTable";
import PermissionWrapper from "../components/PermissionWrapper/PermissionWrapper";
import UploadForm from "../components/FileUpload/FileUpload";
import AttendanceTable from "../components/AttendanceTable";


const Dashboard = () => {
    return (
        <div>
            <PermissionWrapper userPermissions={['Admin']}>
              <QRCodeGenerator/>
               <UploadForm />
            </PermissionWrapper>
            <ClassTable/>
            <AttendanceTable/>
        </div>
    );
};

export default Dashboard;