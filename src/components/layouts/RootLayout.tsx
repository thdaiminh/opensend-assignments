import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hook';
import { useGetCurrentUserQuery, useGetUserStoreInfoQuery } from '@/features/auth/authApi';
import { clearCredentials } from '@/features/auth/authSlice';
import { getWidgetLayout, getWidgets } from '@/features/widget/widgetSlice';
import { useNavigate } from 'react-router';
import { Outlet } from 'react-router-dom';

export const RootLayout = () => {
	const tokens = useAppSelector((state) => state.auth.tokens);
	const { user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isLoading, isError } = useGetCurrentUserQuery(undefined, {
		skip: !tokens || !!user,
		refetchOnMountOrArgChange: true
	});

	const storeId = useAppSelector((state) => state.auth.user?.storeId);

	const { isLoading: isLoadingStoreInfo } = useGetUserStoreInfoQuery(
		{ storeId },
		{
			skip: !storeId
		}
	);

	useEffect(() => {
		dispatch(getWidgetLayout());
		dispatch(getWidgets());
	}, []);

	// Show loading state while fetching user
	if (isLoading || isLoadingStoreInfo) {
		return (
			<div className="min-h-screen min-w-screen bg-base-100 transition-colors flex justify-center items-center">
				<span className="loading loading-spinner text-primary w-16"></span>
			</div>
		);
	}

	if (isError && tokens) {
		clearCredentials();
		navigate('/login');
	}

	return <Outlet />;
};
