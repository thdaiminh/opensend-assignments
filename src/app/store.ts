import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '@/features/auth/authApi';
import authReducer from '@/features/auth/authSlice';
import widgetReducer from '@/features/widget/widgetSlice';

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		auth: authReducer,
		widget: widgetReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
});

setupListeners(store.dispatch);

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
