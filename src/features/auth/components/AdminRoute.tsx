import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/app/hook';
import { UserType } from '@/features/auth';

const AdminRoute = ({ redirectPath = '/dashboard' }: { redirectPath?: string }) => {
	const { isAuthenticated, user } = useAppSelector((state) => state.auth);
	const userRole = user?.role;

	// Check if user is authenticated and has admin role
	if (!isAuthenticated || userRole !== UserType.Admin) {
		return <Navigate to={redirectPath} replace />;
	}

	return <Outlet />;
};

export default AdminRoute;
