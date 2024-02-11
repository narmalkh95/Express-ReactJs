import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const qrApi = createApi({
    reducerPath: 'qrApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }), // Assuming your API base URL is /api
    endpoints: (builder) => ({
        generateQRCode: builder.query({
            query: ({ userId, classroomId }) => `/qr/generateQR/1/1`,
        }),
    }),
});

export const { useGenerateQRCodeQuery } = qrApi;