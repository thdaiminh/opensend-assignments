import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useAppSelector } from '@/app/hook';
// Layout components
import LoginLayout from '@/components/layouts/LoginLayout';
import DashboardLayout from '@/components/layouts/DashboardLayout';
// Pages
import Dashboard from '@/app/routes/dashboard/Dashboard';
import Admin from '@/app/routes/dashboard/Admin';
import Onboarding from '@/app/routes/dashboard/Onboarding';
import Login from '@/features/auth/components/LoginForm';
import NotFound from '@/app/routes/NotFound';
import { RootLayout } from '@/components/layouts/RootLayout';
import ProtectedRoute from '@/features/auth/components/ProtectedRoute';
import { IoBriefcaseOutline, IoHomeOutline, IoSchoolOutline } from 'react-icons/io5';
import React from 'react';
import AdminRoute from '@/features/auth/components/AdminRoute';

// Redirect authenticated users away from auth pages
const RedirectIfAuthenticated = () => {
	const { isAuthenticated } = useAppSelector((state) => state.auth);

	if (isAuthenticated) {
		return <Navigate to="/dashboard" replace />;
	}

	return <Outlet />;
};

export const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				// Protected routes that require authentication & roles
				element: <ProtectedRoute />,
				children: [
					{
						path: '/',
						element: <DashboardLayout />,
						children: [
							{
								index: true,
								element: <Navigate to="/dashboard" replace />
							},
							{
								path: 'dashboard',
								element: <Dashboard />,
								handle: {
									name: 'Dashboard',
									icon: <IoHomeOutline className={'w-full h-full'} />
								}
							},
							{
								element: <AdminRoute />,
								children: [
									{
										path: 'admin',
										element: <Admin />,
										handle: {
											name: 'Admin',
											icon: <IoBriefcaseOutline className={'w-full h-full'} />
										}
									}
								]
							},
							{
								path: 'onboarding',
								element: <Onboarding />,
								handle: {
									name: 'Onboarding',
									icon: <IoSchoolOutline className={'w-full h-full'} />
								}
							}
						]
					}
				]
			},
			{
				// Authentication routes
				element: <RedirectIfAuthenticated />,
				children: [
					{
						path: '/',
						element: <LoginLayout />,
						children: [
							{
								path: 'login',
								element: <Login />
							},
							{
								// path: 'forgot-password',
								// lazy: () => import('./features/auth/ForgotPasswordPage')
							}
						]
					}
				]
			},
			{
				// 404 page
				path: '*',
				element: <NotFound />
			}
		]
	}
]);
