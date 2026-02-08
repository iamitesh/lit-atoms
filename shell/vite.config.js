import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        mfeReact: 'http://localhost:3001/assets/remoteEntry.js',
        mfeAngular: 'http://localhost:3002/remoteEntry.js',
        mfeNext: 'http://localhost:3003/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    port: 3000,
    strictPort: true,
  },
  preview: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
