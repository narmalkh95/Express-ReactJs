import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ username, password }) => ({
                url: '/login',
                method: 'POST',
                body: { username, password },
            }),
        }),
    }),
});

export const { useLoginMutation } = authApi

