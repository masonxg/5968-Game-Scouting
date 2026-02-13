import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    base: '/5968-Game-Scouting/', // MUST match your repo name exactly
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'FRC 2026 QR Scout',
                short_name: 'QR Scout',
                display: 'standalone',
                start_url: '.',
            },
        }),
    ],
})
