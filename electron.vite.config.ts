import path from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, 'src/apps/main/index.ts'),
        },
      },
    },
    resolve: {
      alias: {
        '@resources': path.resolve(__dirname, 'resources'),
        '@main': path.resolve(__dirname, 'src/apps/main'),
        '~': path.resolve(__dirname, 'src/packages'),
      },
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          console: path.resolve(__dirname, 'src/apps/console/preload/index.ts'),
          projector: path.resolve(__dirname, 'src/apps/projector/preload/index.ts'),
        },
      },
    },
    resolve: {
      alias: {
        '@resources': path.resolve(__dirname, 'resources'),
        '@main': path.resolve(__dirname, 'src/apps/main'),
        '@console': path.resolve(__dirname, 'src/apps/console'),
        '@projector': path.resolve(__dirname, 'src/apps/projector'),
        '~': path.resolve(__dirname, 'src/packages'),
      },
    },
  },
  renderer: {
    plugins: [react()],
    root: path.resolve(__dirname, 'src'),
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src/packages'),
        '@console': path.resolve(__dirname, 'src/apps/console'),
        '@projector': path.resolve(__dirname, 'src/apps/projector'),
      },
    },
    build: {
      minify: 'esbuild',
      cssMinify: true,
      rollupOptions: {
        input: {
          console: path.resolve(__dirname, 'src/apps/console/renderer/index.html'),
          projector: path.resolve(__dirname, 'src/apps/projector/renderer/index.html'),
        },
        output: {
          assetFileNames: (assetInfo) => {
            const isStylesAsset = assetInfo.name?.endsWith('.css');
            if (isStylesAsset) {
              return 'assets/styles.[hash].css';
            }
            return 'assets/[name].[hash][extname]';
          },
        },
      },
    },
  },
});
