import { RouterProvider } from 'react-router-dom';
import { AppProvider } from './provider';
import { router } from './routes';

export const App = () => {
	return (
		<AppProvider>
			<RouterProvider router={router} />
		</AppProvider>
	);
};
