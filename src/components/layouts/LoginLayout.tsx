import React from 'react';
import { Outlet } from 'react-router-dom';
import ThemeToggle from '@/components/ui/toggle/ThemeToggle';

const Header = () => {
	return (
		<header className="bg-transparent">
			<div className="container mx-auto px-4 py-3 flex items-center justify-end">
				<div className="flex items-center space-x-4">
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
};

const LoginLayout = () => {
	return (
		<div className={'flex flex-col min-h-screen'}>
			<Header />
			<Outlet />
		</div>
	);
};

export default LoginLayout;
