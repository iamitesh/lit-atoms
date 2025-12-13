import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LitAtomsReact',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'umd.js'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'lit', '@lit/react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          lit: 'Lit',
          '@lit/react': 'LitReact',
        },
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});
