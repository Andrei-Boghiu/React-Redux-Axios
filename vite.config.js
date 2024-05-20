import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'node:dns'

dns.setDefaultResultOrder('verbatim')

// REPLACE WITH YOUR LOCAL NETWORK IP
// Open CMD and type `ipconfig` to find your local network ip
// const localNetworkIP = '192.168.x.x'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: '127.0.0.1',
		// host: localNetworkIP,
		port: 5656,
		open: false, // optional: automatically open the browser
	},
})
