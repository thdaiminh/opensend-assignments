import React from 'react';
import { useAppSelector } from '@/app/hook';
import { OnboardingStatus } from '@/features/auth';
import { IoSchoolOutline } from 'react-icons/io5';

const Onboarding = () => {
	const { user } = useAppSelector((state) => state.auth);
	const isFinishedOnboarding = user?.onboardingStatus === OnboardingStatus.Done;

	return (
		<div className={'w-full h-full flex flex-col gap-8 items-center justify-center'}>
			<div className={''}>
				<IoSchoolOutline className={'fill-primary w-32 h-32 stroke-primary'} />
			</div>
			<div className={'text-2xl w-2/3 text-center font-semibold'}>
				{isFinishedOnboarding ? (
					<span>
						Looks like you've finished your onboarding process.
						<br /> Well done!
					</span>
				) : (
					<span>
						Welcome to Opensend,
						<br /> To start your onboarding process click on the button below
					</span>
				)}
			</div>
			{!isFinishedOnboarding && <button className={'btn btn-primary btn-lg w-48'}>Start</button>}
		</div>
	);
};

export default Onboarding;
