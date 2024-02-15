import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {baseQueryWithLogout, getToken} from "../helpers/auth";
export const classApi = createApi({
	reducerPath: 'classApi',
	// baseQuery: fetchBaseQuery({
	// 	baseUrl: 'http://localhost:8080' ,
	// 	prepareHeaders: (headers, { getState }) => {
	// 			const token = getToken();
	// 			// If we have a token set in state, let's assume that we should be passing it.
	// 			if (token) {
	// 				headers.set('authorization', token)
	// 			}
	// 			return headers
	// 		},
	// 	}),
	baseQuery: baseQueryWithLogout,
	endpoints: (builder) => ({
		createLesson: builder.mutation({
			query: (body) => ({
				url: '/class',
				method: 'POST',
				body
			}),
		}),

		getLessons: builder.mutation({
			query: () => ({
				url: '/class',
				method: 'GET',
			}),
		})
	}),
});

export const { useCreateLessonMutation, useGetLessonsMutation } = classApi

