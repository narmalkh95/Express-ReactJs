import React from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    DashboardOutlined,
    LoginOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import {logout} from "../../slice/authSlice";

const { Sider } = Layout;

const Sidebar = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Sider style={{ height: '100vh' }}>
            <div className="logo" />
            <Menu theme="dark" mode="inline">
                <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                {isAuthenticated && (
                    <Menu.Item key="2" icon={<DashboardOutlined />}>
                        <Link to="/dashboard">Dashboard</Link>
                    </Menu.Item>
                )}
                {!isAuthenticated && (
                    <Menu.Item key="3" icon={<LoginOutlined />}>
                        <Link to="/login">Login</Link>
                    </Menu.Item>
                )}

                {isAuthenticated && (
                    <Menu.Item key="5" icon={<LogoutOutlined />} onClick={handleLogout}>
                        Logout
                    </Menu.Item>
                )}
            </Menu>
        </Sider>
    );
};

export default Sidebar;
