import { useTheme } from '@/app/providers/ThemeProvider';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/app/hook';
import { clearCredentials } from '@/features/auth/authSlice';
import {
	IoBriefcaseOutline,
	IoChevronDown,
	IoHomeOutline,
	IoLogOutOutline,
	IoPersonOutline,
	IoSchoolOutline,
	IoSettingsOutline
} from 'react-icons/io5';

import { NavLink } from 'react-router-dom';
import { UserType } from '@/features/auth';
import LogoDark from '@/assets/logo-dark.svg';
import LogoWhite from '@/assets/logo-white.svg';
import React from 'react';

const Sidebar = () => {
	const { darkMode } = useTheme();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.auth);
	const userRole = user?.role;

	const handleLogout = () => {
		dispatch(clearCredentials());
		navigate('/login');
	};

	return (
		<div className="drawer-side z-99">
			<label htmlFor="sidebar-toggle" aria-label="close sidebar" className="drawer-overlay"></label>
			<div className="h-full w-[264px] max-w-[264px] bg-accent flex flex-col">
				<div className="dropdown dropdown-center">
					<div
						tabIndex={0}
						role="button"
						className=" flex justify-between items-center w-full px-6 py-5 gap-2 pointer-events-auto cursor-pointer hover:bg-base-300"
					>
						<div
							className={
								'text-base-100 rounded-full bg-base-300 border-gray-2 dark:border-gray-7 border-1 min-w-10 w-10 h-10 flex justify-center items-center p-2'
							}
						>
							{user?.url ? (
								<img src={user?.url} alt="user" className="w-full h-full" />
							) : (
								<div className={'text-base-content'}>{user?.first_name?.[0] || user?.email?.[0]}</div>
							)}
						</div>
						<div className="text-base-content flex flex-col justify-between overflow-hidden">
							<span className={'text-md font-semibold'}>
								{user?.first_name} {user?.last_name}
							</span>
							<span className={'text-xs truncate'}>{user?.email}</span>
						</div>
						<IoChevronDown className={'fill-base-content w-3 min-w-3 h-3'} />
					</div>
					<ul tabIndex={0} className="dropdown-content menu bg-white dark:bg-warm-black w-4/5 rounded-box z-1 p-2 shadow-sm">
						<li>
							<div className={'flex gap-2 items-center'}>
								<IoPersonOutline />
								<span className={'text-xl font-darkerGrotesque'}>Profile</span>
							</div>
						</li>
						<li>
							<div className={'flex gap-2 items-center'}>
								<IoSettingsOutline />
								<span className={'text-xl font-darkerGrotesque'}>Settings</span>
							</div>
						</li>
						<div className="divider my-1 "></div>
						<li>
							<div className={'flex gap-2 items-center'} onClick={handleLogout}>
								<IoLogOutOutline className={'stroke-error-2'} />
								<span className={'text-xl font-darkerGrotesque text-error-2'}>Logout</span>
							</div>
						</li>
					</ul>
				</div>

				<div className="flex-1 overflow-y-auto">
					<ul className="menu w-full text-base-content min-h-full p-0">
						<li>
							<NavLink
								to={'dashboard'}
								className={({ isActive }) =>
									isActive
										? 'menu-active font-semibold rounded-none h-11 px-6 py-2 flex items-center gap-3'
										: 'rounded-none h-11 px-6 py-2 flex items-center gap-3'
								}
							>
								<IoHomeOutline className={'w-4 h-4'} />
								<span className={'text-xl font-darkerGrotesque'}>Home</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								to={'onboarding'}
								className={({ isActive }) =>
									isActive
										? 'menu-active font-semibold rounded-none h-11 px-6 py-2 flex items-center gap-3'
										: 'rounded-none h-11 px-6 py-2 flex items-center gap-3'
								}
							>
								<IoSchoolOutline className={'w-4 h-4'} />
								<span className={'text-xl font-darkerGrotesque'}>Onboarding</span>
							</NavLink>
						</li>
						{userRole === UserType.Admin && (
							<li>
								<NavLink
									to={'admin'}
									className={({ isActive }) =>
										isActive
											? 'menu-active font-semibold rounded-none h-11 px-6 py-2 flex items-center gap-3'
											: 'rounded-none h-11 px-6 py-2 flex items-center gap-3  '
									}
								>
									<IoBriefcaseOutline className={'w-4 h-4'} />
									<span className={'text-xl font-darkerGrotesque'}>Admin</span>
								</NavLink>
							</li>
						)}
					</ul>
				</div>
				<div className="flex justify-center items-center w-full p-4 border-t border-base-300 dark:border-gray-7">
					<img className="w-auto h-8" alt="Logo" srcSet={!darkMode ? LogoDark : LogoWhite} />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
