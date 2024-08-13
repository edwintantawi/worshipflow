import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@resources': resolve('resources'),
        '@main': resolve(__dirname, 'src/main'),
      },
    },
  },
  preload: {
    root: resolve(__dirname, 'src'),
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@resources': resolve('resources'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          console: resolve(__dirname, 'src/console/preload/index.ts'),
          projector: resolve(__dirname, 'src/projector/preload/index.ts'),
        },
      },
    },
  },
  renderer: {
    root: resolve(__dirname, 'src'),
    resolve: {
      alias: {
        '@console': resolve('src/console/renderer'),
        '@projector': resolve('src/projector/renderer'),
      },
    },
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          console: resolve(__dirname, 'src/console/renderer/index.html'),
          projector: resolve(__dirname, 'src/projector/renderer/index.html'),
        },
      },
    },
  },
});
