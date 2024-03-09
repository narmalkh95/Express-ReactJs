import {useState} from 'react';
import {useLoginMutation} from "../../features/authApi";
import {useNavigate} from 'react-router-dom';

import styles from './login.module.css';
import {setRoles, setToken} from "../../helpers/auth";
import { setLoginSuccess} from "../../slice/authSlice";
import {useDispatch} from "react-redux";

const {loginForm, inputField, loginButton} = styles;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, {isLoading, error}] = useLoginMutation();

    const handleLogin = async () => {
        try {
            login({email, password}).then(data => {
                const {token, roles} = data?.data || {};

                if (token) {
                    setToken(token);
                    setRoles(roles);

                    navigate('/dashboard');
                    dispatch(setLoginSuccess());
                }
            });
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (

        <div className={loginForm}>
            <h2>Մուտք</h2>
            <input type="email" className={inputField} placeholder="Email" value={email}
                   onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" className={inputField} placeholder="Password" value={password}
                   onChange={(e) => setPassword(e.target.value)}/>
            <button className={loginButton} onClick={handleLogin}>Մուտք</button>
            {isLoading && <p>Բեռնվում է...</p>}
            {error && <p>Սխալ: {error.message}</p>}
        </div>

    );
};

export default Login;
