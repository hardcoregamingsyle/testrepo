import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSRI } from 'vite-plugin-subresource-integrity';

export default defineConfig({
  plugins: [react(), viteSRI()],
  build: {
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});