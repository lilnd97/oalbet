import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // để Android load đúng file
  build: {
    outDir: 'dist', // Capacitor webDir trỏ đến đây
  },
});
