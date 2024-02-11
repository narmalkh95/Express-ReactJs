import {useEffect, useState} from 'react';
import {useLoginMutation} from "../../features/authApi";
import {useNavigate} from 'react-router-dom';

import styles from './login.module.css';

const {loginForm, inputField, loginButton} = styles;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [login, {data, isSuccess,isError, isLoading, error}] = useLoginMutation();

    const handleLogin = async () => {
        try {
            await login({username, password});
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            navigate('/home');
        }

    }, [isSuccess])

    return (

        <div className={loginForm}>
            <h2>Login</h2>
            <input type="text" className={inputField} placeholder="Username" value={username}
                   onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" className={inputField} placeholder="Password" value={password}
                   onChange={(e) => setPassword(e.target.value)}/>
            <button className={loginButton} onClick={handleLogin}>Login</button>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
        </div>

    );
};

export default Login;
