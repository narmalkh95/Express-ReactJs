import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Layout, Menu} from 'antd';
import {
    HomeOutlined,
    DashboardOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import {logout} from "../../slice/authSlice";
import PermissionWrapper from "../PermissionWrapper/PermissionWrapper";

const {Sider} = Layout;

const Sidebar = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Sider style={{height: '100vh'}}>
            <div className="logo"/>
            <Menu theme="dark" mode="inline">
                <PermissionWrapper userPermissions={['Admin']}>
                    <Menu.Item key="1" icon={<HomeOutlined/>}>
                        <Link to="/class/create">Class List</Link>
                    </Menu.Item>
                </PermissionWrapper>
                <PermissionWrapper userPermissions={['Admin']}>
                    <Menu.Item key="2" icon={<DashboardOutlined/>}>
                        <Link to="/dashboard">Dashboard</Link>
                    </Menu.Item>
                </PermissionWrapper>
                <PermissionWrapper userPermissions={['Admin', 'Student']}>
                    <Menu.Item key="3" icon={<DashboardOutlined/>}>
                        <Link to="/score">Score</Link>
                    </Menu.Item>
                </PermissionWrapper>
                <PermissionWrapper userPermissions={['Admin']}>
                    <Menu.Item key="4" icon={<LogoutOutlined/>} onClick={handleLogout}>
                        Logout
                    </Menu.Item>
                </PermissionWrapper>

            </Menu>
        </Sider>
    );
};

export default Sidebar;
