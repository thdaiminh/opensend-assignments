import { useTheme } from '@/app/providers/ThemeProvider';
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';

const ThemeToggle = ({ childClasses }: { childClasses?: string }) => {
	const { darkMode, toggleDarkMode } = useTheme();

	return (
		<div
			className={`${childClasses} flex items-center cursor-pointer justify-center gap-3 py-1 px-2 bg-base-200 border-base-300 shadow border rounded-full h-full w-auto`}
			onClick={toggleDarkMode}
		>
			{!darkMode && <IoSunnyOutline stroke={'#ffbc52'} className={'w-6 h-6'} />}
			{darkMode && <IoMoonOutline stroke={'#485365'} className={'w-6 h-6 translate-x-[145%]'} />}
			<div
				className={`radio bg-[#ffeccf] border-[#ffbc52] border-3 transition-all ease-in-out duration-300 translate-x-0 dark:-translate-x-[145%] dark:bg-[#485365] dark:border-white `}
			/>
		</div>
	);
};

export default ThemeToggle;
