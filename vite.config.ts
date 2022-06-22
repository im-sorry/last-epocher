import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue';
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components';
import legacy from '@vitejs/plugin-legacy';
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    legacy(),
    vue(),
    ViteComponents({
      customComponentResolvers: [AntDesignVueResolver()],
    }),
  ],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
