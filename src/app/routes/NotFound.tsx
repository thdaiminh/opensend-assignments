import React from 'react';
import { useTheme } from '@/app/providers/ThemeProvider';
import LogoDark from '@/assets/logo-dark.svg';
import LogoWhite from '@/assets/logo-white.svg';
import { useNavigate } from 'react-router';

const NotFound = () => {
	const { darkMode } = useTheme();
	const navigate = useNavigate();

	const handleBackToDashboard = () => {
		navigate('/dashboard');
	};
	return (
		<div className="h-screen bg-accent flex flex-col gap-6 items-center justify-center">
			<img className="w-auto h-8" alt="Logo" srcSet={!darkMode ? LogoDark : LogoWhite} />
			<div className="bg-base-200 shadow-none w-5/6 sm:w-full max-w-6xl border rounded-lg p-6 sm:p-12">
				<div className="flex flex-col sm:flex-row items-center justify-between">
					<div className="flex-1 flex flex-col items-center justify-center gap-8">
						<h3 className="text-4xl font-darkerGrotesque font-semibold leading-normal text-center">Page not found</h3>
						<p className="text-sm font-sans font-normal text-center">
							We can't find the page you are looking for. Please head back to the dashboard.
						</p>
						<div className="flex justify-center">
							<button className="btn inline-flex items-center justify-center font-darkerGrotesque btn-primary btn-lg" onClick={handleBackToDashboard}>
								Back to Dashboard
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
