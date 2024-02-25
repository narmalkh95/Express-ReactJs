import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {setError, setLoading} from "../slice/authSlice";
import {setToken} from "../helpers/auth";
import {SERVER_HOST_IP} from "../constants/config";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://${SERVER_HOST_IP}`,}),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ username, password }) => ({
                url: '/login',
                method: 'POST',
                body: { username, password },
            }),
        }),
        onSuccess: (data, { dispatch }) => {
             const { token } = data;
            setToken(token);
            dispatch(setLoading(false));
        },
        onError: (error, { dispatch }) => {
            dispatch(setError(error.message));
        },
        getUserData: builder.query({
            query: () => '/user',
        }),
    }),
});

export const { useLoginMutation, useGetUserDataQuery  } = authApi

