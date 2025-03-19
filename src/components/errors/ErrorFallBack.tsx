import React from 'react';
import LogoDark from '@/assets/logo-dark.svg';

interface ErrorFallbackProps {
	error: Error;
}

const ErrorFallBack = ({ error }: ErrorFallbackProps) => {
	return (
		<div className="h-screen bg-accent flex flex-col gap-6 items-center justify-center">
			<img className="w-auto h-8" alt="Logo" srcSet={LogoDark} />
			<div className="bg-base-200 shadow-none w-5/6 sm:w-full max-w-6xl border rounded-lg p-6 sm:p-12">
				<div className="flex flex-col sm:flex-row items-center justify-between">
					<div className="flex-1 flex flex-col items-center justify-center gap-8">
						<h3 className="text-4xl font-darkerGrotesque font-semibold leading-normal text-center">Something went wrong 🤔</h3>
						<p className="text-sm font-sans font-normal text-center">{error.message}</p>
						<div className="flex justify-center">
							<button
								className="btn inline-flex items-center justify-center font-darkerGrotesque btn-primary btn-lg"
								onClick={() => window.location.assign(window.location.origin)}
							>
								Back to Dashboard
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ErrorFallBack;
