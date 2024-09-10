import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api', // не обязательно, будет автоматически
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }), // путь запроса
    tagTypes: ['Heroes'],
    endpoints: builder => ({
        getHeroes: builder.query({
            query: () => '/heroes', // получение героев по этому пути
            providesTags: ['Heroes']
        }),
        createHero: builder.mutation({
            query: hero => ({
                url: '/heroes',
                method: 'POST',
                body: hero
            }),
            invalidatesTags: ['Heroes']
        }),
        deleteHero: builder.mutation({
            query: id => ({
                url: `/heroes/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Heroes']
        })
    })
});

export const { useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation } = apiSlice;