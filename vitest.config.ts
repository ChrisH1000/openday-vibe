/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
    deps: {
      inline: [/next/, /@testing-library\/jest-dom/],
      external: [/@testing-library\/jest-dom/]
    }
  },
})