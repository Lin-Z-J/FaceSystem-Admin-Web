import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
		plugins: [vue()],
		base: './',
		server: {
		    host: '0.0.0.0',
		    port: 3001,
		  },
		build: {
		  // 清除console和debugger
		  terserOptions: {
		    compress: {
		      drop_console: true,
		      drop_debugger: true,
		    },
		  },
		},
})
