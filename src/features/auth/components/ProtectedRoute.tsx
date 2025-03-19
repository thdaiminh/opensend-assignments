import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '@/app/hook';
import { OnboardingStatus, UserType } from '@/features/auth';

const ProtectedRoute = ({ redirectPath = '/login' }: { redirectPath?: string }) => {
	const navigate = useNavigate();
	const { isAuthenticated, user } = useAppSelector((state) => state.auth);
	const userRole = user?.role;

	useEffect(() => {
		if (isAuthenticated) {
			if (userRole === UserType.Admin) {
				navigate('/admin', { replace: true });
			} else if (userRole === UserType.Client) {
				if (user?.onboardingStatus) {
					const onboardingStatus = user?.onboardingStatus;
					if (onboardingStatus !== OnboardingStatus.Done) {
						navigate('/onboarding', { replace: true });
					} else {
						navigate('/dashboard', { replace: true });
					}
				}
			}
		}
	}, [isAuthenticated, userRole, user?.onboardingStatus, navigate]);

	if (!isAuthenticated) {
		return <Navigate to={redirectPath} replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
