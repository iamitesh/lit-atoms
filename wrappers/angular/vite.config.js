import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LitAtomsAngular',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ['@angular/core', '@angular/forms', 'lit', 'rxjs', 'lit-atoms'],
      output: {
        preserveModules: false,
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      'lit-atoms': resolve(__dirname, '../../dist'),
    },
  },
});
