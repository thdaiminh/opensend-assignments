import React, { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { ModalProvider } from '@/app/providers/ModalContext';
import ErrorFallBack from '@/components/errors/ErrorFallBack';

export const AppProvider = ({ children }: { children: ReactNode }) => {
	return (
		<React.Suspense
			fallback={
				<div className="flex h-screen w-screen items-center justify-center">
					<span className="loading loading-spinner text-primary w-16"></span>
				</div>
			}
		>
			<ErrorBoundary FallbackComponent={ErrorFallBack}>
				<Provider store={store}>
					<ThemeProvider>
						<ModalProvider>{children}</ModalProvider>
					</ThemeProvider>
				</Provider>
			</ErrorBoundary>
		</React.Suspense>
	);
};
