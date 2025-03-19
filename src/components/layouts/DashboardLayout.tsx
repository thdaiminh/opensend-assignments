import React from 'react';
import { Outlet, useMatches, type UIMatch } from 'react-router-dom';
import { IoMenuSharp } from 'react-icons/io5';

import ThemeToggle from '@/components/ui/toggle/ThemeToggle';
import Sidebar from '@/components/ui/sidebar/Sidebar';

const Header = () => {
	// Need to handle the type separately since there's an issue with UIMatch type on react-router v7
	// More info here: https://github.com/remix-run/react-router/discussions/10180
	type Handle = {
		name?: string;
		icon?: React.ReactNode;
	};

	const useTypedMatches = <TData extends unknown>() => useMatches() as UIMatch<TData, Handle>[];
	const matches = useTypedMatches();
	const match = matches.reverse().find((match) => match.handle && match.handle.name);

	return (
		<header className="bg-transparent border-b border-base-300 dark:border-gray-7">
			<div className="px-4 py-3 flex items-center justify-between">
				<div className={'flex items-center gap-5'}>
					<div className="flex items-center justify-center cursor-pointer lg:hidden">
						<input id="sidebar-toggle" type="checkbox" className="drawer-toggle" />
						<label htmlFor="sidebar-toggle" className={'cursor-pointer'}>
							<IoMenuSharp className={'w-8 h-8'} />
						</label>
					</div>
					<div className={'flex gap-3 items-center'}>
						<div className={'w-8 h-8'}>{match?.handle?.icon}</div>
						<span className="text-2xl text-base-content font-semibold font-darkerGrotesque">{match?.handle?.name || ''}</span>
					</div>
				</div>

				<div className="flex items-center space-x-4">
					<ThemeToggle childClasses={'bg-white shadow-none dark:bg-accent dark:border-gray-7'} />
				</div>
			</div>
		</header>
	);
};

const DashboardLayout = () => {
	return (
		<div className="flex h-screen drawer lg:drawer-open">
			<input id="sidebar-toggle" type="checkbox" className="drawer-toggle" />
			<Sidebar />
			<div className="flex drawer-content flex-col flex-1 overflow-hidden bg-white dark:bg-warm-black">
				<Header />
				<main className="flex-1 overflow-auto p-4 pb-0">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
