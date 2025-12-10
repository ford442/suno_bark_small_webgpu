import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: './', // Use relative paths for assets to support subdirectory hosting
    build: {
        target: 'esnext' // WebGPU support often benefits from modern targets
    }
})
