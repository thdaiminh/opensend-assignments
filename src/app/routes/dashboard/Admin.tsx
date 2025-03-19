import React from 'react';
import { IoBriefcaseOutline } from 'react-icons/io5';

const Admin = () => {
	return (
		<div className={'w-full h-full flex flex-col gap-8 items-center justify-center'}>
			<div className={''}>
				<IoBriefcaseOutline className={'fill-primary w-32 h-32 stroke-primary'} />
			</div>
			<div className={'text-2xl w-1/3 text-center font-semibold'}>Welcome to Admin page</div>
		</div>
	);
};

export default Admin;
