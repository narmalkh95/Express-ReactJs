import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const classApi = createApi({
	reducerPath: 'classApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
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

