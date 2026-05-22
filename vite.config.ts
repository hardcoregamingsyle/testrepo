import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSRI } from 'vite-plugin-subresource-integrity';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), viteSRI()],
    define: {
      'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    },
    build: {
      sourcemap: false,
      minify: 'terser',
    },
  };
});