import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthResponse, GetStoreRequest, LoginRequest, StoreResponse, User } from './types';
import { RootState } from '@/app/store';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_APP_API_URL,
		prepareHeaders: (headers, { getState }) => {
			// Get tokens from the auth slice
			const tokens = (getState() as RootState).auth.tokens;

			// If we have tokens, add it to the headers
			if (tokens) {
				headers.set('Access-Token', `Bearer ${tokens.accessToken}`);
				headers.set('Client-Token', `${tokens.clientToken}`);
			}

			return headers;
		}
	}),
	tagTypes: ['UserStore', 'User', 'Auth'],
	endpoints: (builder) => ({
		login: builder.mutation<AuthResponse, LoginRequest>({
			query: (credentials) => ({
				url: '/auth/login',
				method: 'POST',
				body: credentials
			}),
			invalidatesTags: ['User', 'UserStore']
		}),
		getCurrentUser: builder.query<AuthResponse, void>({
			query: () => '/self/profile',
			providesTags: ['User']
		}),
		getUserStoreInfo: builder.query<StoreResponse, GetStoreRequest>({
			query: (payload) => ({
				url: `/store/${payload.storeId}`,
				method: 'GET'
			}),

			providesTags: ['UserStore']
		})
	})
});

export const { useLoginMutation, useGetCurrentUserQuery, useGetUserStoreInfoQuery, useLazyGetUserStoreInfoQuery } = authApi;
