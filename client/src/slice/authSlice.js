import { createSlice } from '@reduxjs/toolkit';
import {getToken} from "../helpers/auth";

const initialState = {
    isAuthenticated: !!getToken(),
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        },
    },
});

export const { setLoading, setError, logout } = authSlice.actions;

export default authSlice;