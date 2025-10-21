import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'offline.html'],
			manifest: {
				name: 'Projekt SEW',
				short_name: 'SEW',
				description: 'Svelte project converted to PWA',
				theme_color: '#ffffff',
				icons: [
					{
						src: '/pwa-192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/pwa-512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
				runtimeCaching: [
					{
						urlPattern: /\/api\//,
						handler: 'NetworkFirst',
						options: {
							cacheName: 'api-cache',
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 24 * 60 * 60
							}
						}
					},
					{
						urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
						handler: 'StaleWhileRevalidate',
						options: {
							cacheName: 'image-cache',
							expiration: {
								maxEntries: 60,
								maxAgeSeconds: 30 * 24 * 60 * 60
							}
						}
					}
				]
			}
		})
	]
});
