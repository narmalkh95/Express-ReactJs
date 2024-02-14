import React from 'react';
import { Layout } from 'antd';
import Sidebar from "../components/Sidebar/Sidebar";

const { Content } = Layout;

const AppLayout = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout>
                <Content>{children}</Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
