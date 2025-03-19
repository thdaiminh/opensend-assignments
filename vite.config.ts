import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
	base: './',
	plugins: [react(), viteTsconfigPaths(), tailwindcss()],
	server: {
		port: 8080
	}
});
