import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from './authApi';
import { AuthState, Token, User, UserType } from './types';

const initialState: AuthState = {
	tokens: JSON.parse(localStorage.getItem('tokens') as string) || null,
	user: null,
	isAuthenticated: !!localStorage.getItem('tokens')
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<{ tokens: Token; user: User; storeId: number; role: UserType }>) => {
			const { tokens, user, storeId, role } = action.payload;
			state.tokens = tokens;
			state.user = { ...user, storeId: storeId, role: role };
			state.isAuthenticated = true;
			localStorage.setItem('tokens', JSON.stringify(tokens));
		},
		clearCredentials: (state) => {
			state.user = null;
			state.tokens = null;
			state.isAuthenticated = false;
			localStorage.removeItem('tokens');
			localStorage.removeItem('layouts');
			localStorage.removeItem('widgets');
			authApi.util.invalidateTags(['User', 'UserStore']);
		}
	},
	extraReducers: (builder) => {
		builder
			// When login is successful, save the token and user
			.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
				state.tokens = payload.tokens;
				state.user = { ...payload.user, storeId: payload.accesses[0].store_id, role: payload.view.type };
				state.isAuthenticated = true;
				localStorage.setItem('tokens', JSON.stringify(payload.tokens));
			})
			// Save credentials when getCurrentUser succeed
			.addMatcher(authApi.endpoints.getCurrentUser.matchFulfilled, (state, { payload }) => {
				state.user = { ...payload.user, storeId: payload.accesses[0].store_id, role: payload.view.type };
				state.isAuthenticated = true;
			})
			// Save onboarding info when authenticated
			.addMatcher(authApi.endpoints.getUserStoreInfo.matchFulfilled, (state, { payload }) => {
				if (state.user) {
					state.user.onboardingStatus = payload.store.onboarding_procedure.onboarding_status;
				}
			});
	}
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
