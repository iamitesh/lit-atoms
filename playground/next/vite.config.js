import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'playgroundNext',
      filename: 'remoteEntry.js',
      exposes: {
        './Widget': './src/components/Widget.jsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    port: 3003,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 3003,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
