import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTheme } from '@/app/providers/ThemeProvider';
import { useAppDispatch, useAppSelector } from '@/app/hook';
import { LoginRequest, useLoginMutation, useGetUserStoreInfoQuery, useLazyGetUserStoreInfoQuery } from '@/features/auth';
import { setCredentials } from '../authSlice';
import LogoDark from '@/assets/logo-dark.svg';
import LogoWhite from '@/assets/logo-white.svg';

const LoginForm = () => {
	const { darkMode } = useTheme();
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.auth);
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid }
	} = useForm<LoginRequest>({ mode: 'onBlur' });
	const [login, { isLoading }] = useLoginMutation();

	const { data: storeInfo } = useGetUserStoreInfoQuery({ storeId: user?.storeId }, { skip: !user });

	const shouldDisableSubmitButton = () => {
		return Object.keys(errors).length > 0 || !isValid;
	};
	const [showPassword, setShowPassword] = React.useState(false);
	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
		await login(data)
			.unwrap()
			.then(async (payload) => {
				dispatch(
					setCredentials({
						tokens: payload.tokens,
						user: payload.user,
						storeId: payload.accesses[0].store_id,
						role: payload.view.type
					})
				);
			})
			.catch((error) => {
				if (error.data.code === 'AUTH_EMAIL_NOTFOUND') {
					setError('email', { type: 'manual', message: error.data.message });
				} else {
					setError('password', { type: 'manual', message: error.data.message });
				}
			});
	};

	return (
		<div className={'flex flex-grow flex-col gap-6 items-center justify-center'}>
			<div>
				<img className="w-auto h-8" alt="Logo" srcSet={!darkMode ? LogoDark : LogoWhite} />
			</div>
			<div className={'card bg-base-200 border shadow-none rounded-sm border-none p-12 space-y-8 w-full xs:w-[480px]'}>
				<div className="flex flex-col items-center gap-4">
					<h4 className="text-3xl font-darkerGrotesque font-semibold leading-normal ">Welcome back!</h4>
					<p className="text-sm font-sans font-normal ">Log in to continue with Opensend</p>
				</div>
				<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
					<div className={'space-y-2'}>
						<label className={`w-full input input-primary focus-within:shadow-none focus-within:outline-none ${errors.email && 'input-error'}`}>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-4 h-4">
								<path
									d="M2 8.8C2 7.11984 2 6.27976 2.32698 5.63803C2.6146 5.07354 3.07354 4.6146 3.63803 4.32698C4.27976 4 5.11984 4 6.8 4H17.2C18.8802 4 19.7202 4 20.362 4.32698C20.9265 4.6146 21.3854 5.07354 21.673 5.63803C22 6.27976 22 7.11984 22 8.8V15.2C22 16.8802 22 17.7202 21.673 18.362C21.3854 18.9265 20.9265 19.3854 20.362 19.673C19.7202 20 18.8802 20 17.2 20H6.8C5.11984 20 4.27976 20 3.63803 19.673C3.07354 19.3854 2.6146 18.9265 2.32698 18.362C2 17.7202 2 16.8802 2 15.2V8.8Z"
									fill="#BABDCC"
								></path>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M6.17538 8.43441C6.4878 7.97898 7.11027 7.86305 7.56569 8.17548L11.4343 10.8293C11.7752 11.0632 12.2248 11.0632 12.5657 10.8294L16.4343 8.17548C16.8897 7.86305 17.5122 7.97898 17.8246 8.43441C18.137 8.88983 18.0211 9.51229 17.5657 9.82471L13.6971 12.4786C12.6744 13.1801 11.3256 13.1801 10.3029 12.4786L6.43431 9.82471C5.97889 9.51229 5.86296 8.88983 6.17538 8.43441Z"
									fill="black"
								></path>
							</svg>
							<input
								placeholder="Email address"
								{...register('email', {
									required: {
										value: true,
										message: 'Please enter your email address'
									},
									pattern: {
										value:
											/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
										message: 'Enter valid email address'
									}
								})}
							/>
						</label>
						{errors.email && <div className="validator-hint mt-0 text-error">{errors.email.message}</div>}
					</div>

					<div className={'space-y-2'}>
						<label className={`w-full input input-primary focus-within:shadow-none focus-within:outline-none ${errors.password && 'input-error'}`}>
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
								<path
									d="M10.5594 6H5.4413C5.08988 5.99999 4.78668 5.99998 4.53698 6.02038C4.27341 6.04192 4.01127 6.08946 3.75901 6.21799C3.38269 6.40974 3.07673 6.7157 2.88498 7.09202C2.75645 7.34427 2.70891 7.60642 2.68737 7.86998C2.66697 8.11969 2.66698 8.42286 2.66699 8.77428V11.8924C2.66698 12.2438 2.66697 12.547 2.68737 12.7967C2.70891 13.0603 2.75645 13.3224 2.88498 13.5746C3.07673 13.951 3.38269 14.2569 3.75901 14.4487C4.01127 14.5772 4.27341 14.6248 4.53698 14.6463C4.78669 14.6667 5.08986 14.6667 5.44129 14.6667H10.5593C10.9108 14.6667 11.214 14.6667 11.4637 14.6463C11.7272 14.6248 11.9894 14.5772 12.2416 14.4487C12.618 14.2569 12.9239 13.951 13.1157 13.5746C13.2442 13.3224 13.2917 13.0603 13.3133 12.7967C13.3337 12.547 13.3337 12.2438 13.3337 11.8924V8.77432C13.3337 8.42292 13.3337 8.11968 13.3133 7.86998C13.2917 7.60642 13.2442 7.34427 13.1157 7.09202C12.9239 6.7157 12.618 6.40974 12.2416 6.21799C11.9894 6.08946 11.7272 6.04192 11.4637 6.02038C11.214 5.99998 10.9108 5.99999 10.5594 6Z"
									fill="#C8C9C8"
								></path>
								<path
									d="M7.33301 10.6667C7.33301 10.2985 7.63148 10 7.99967 10C8.36786 10 8.66634 10.2985 8.66634 10.6667V11.3333C8.66634 11.7015 8.36786 12 7.99967 12C7.63148 12 7.33301 11.7015 7.33301 11.3333V10.6667Z"
									fill="#1C1C1C"
								></path>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M5.33301 4.00001C5.33301 2.52725 6.52692 1.33334 7.99967 1.33334C9.47243 1.33334 10.6663 2.52725 10.6663 4.00001V6.00001H9.33301V4.00001C9.33301 3.26363 8.73605 2.66668 7.99967 2.66668C7.26329 2.66668 6.66634 3.26363 6.66634 4.00001V6.00001H5.33301V4.00001Z"
									fill={darkMode ? '#C8C9C8' : '#1C1C1C'}
								></path>
							</svg>
							<input
								type={showPassword ? 'text' : 'password'}
								placeholder="Password"
								{...register('password', {
									required: {
										value: true,
										message: 'Password should have at least 8 characters.'
									},
									minLength: {
										value: 8,
										message: 'Password should have at least 8 characters.'
									}
								})}
							/>
							<div className="cursor-pointer p-0 bg-transparent border-none" onClick={() => toggleShowPassword()}>
								{showPassword ? (
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M12.0003 4C5.89153 4 3.13941 8.78756 2.27008 10.7399C1.91168 11.5448 1.91168 12.4552 2.27008 13.2601C3.13941 15.2124 5.89153 20 12.0003 20C18.1092 20 20.8611 15.2122 21.7303 13.2599C22.0886 12.4552 22.0886 11.5448 21.7303 10.7401C20.8611 8.78782 18.1092 4 12.0003 4Z"
											fill="#BABDCC"
										></path>
										<path
											d="M10 12C11.1046 12 12 11.1046 12 10C12 9.64033 11.9051 9.30283 11.7389 9.01121C11.8249 9.00379 11.912 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 11.912 9.00379 11.8249 9.01121 11.7389C9.30283 11.9051 9.64033 12 10 12Z"
											fill="black"
										></path>
									</svg>
								) : (
									<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<g clipPath="url(#clip0_194_6186)">
											<path
												d="M6.22818 12.5214L4.94085 12.1761L5.46551 10.2167C4.68016 9.92709 3.95026 9.50498 3.30751 8.96874L1.87218 10.4047L0.928846 9.46141L2.36485 8.02607C1.55423 7.05524 1.00957 5.89058 0.78418 4.64607L2.09618 4.40674C2.60218 7.20807 5.05285 9.33341 8.00018 9.33341C10.9468 9.33341 13.3982 7.20807 13.9042 4.40674L15.2162 4.6454C14.9911 5.89008 14.4467 7.05498 13.6362 8.02607L15.0715 9.46141L14.1282 10.4047L12.6928 8.96874C12.0501 9.50498 11.3202 9.92709 10.5348 10.2167L11.0595 12.1767L9.77218 12.5214L9.24685 10.5614C8.42175 10.7028 7.57861 10.7028 6.75351 10.5614L6.22818 12.5214Z"
												fill="#A3A3A3"
											></path>
										</g>
										<defs>
											<clipPath id="clip0_194_6186">
												<rect width="16" height="16" fill="white"></rect>
											</clipPath>
										</defs>
									</svg>
								)}
							</div>
						</label>
						{errors.password && <p className="validator-hint mt-0 text-error">{errors.password.message}</p>}
					</div>

					<div className={'flex flex-col space-y-2'}>
						<button
							className="btn btn-primary font-darkerGrotesque text-lg w-full rounded-sm font-semibold shadow-none"
							disabled={shouldDisableSubmitButton()}
							type="submit"
						>
							{isLoading ? <span className="loading loading-spinner"></span> : <span>Login</span>}
						</button>
						<button className="btn btn-neutral btn-outline font-darkerGrotesque text-lg w-full rounded-sm font-semibold shadow-none">
							Forgot Your Password?
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
