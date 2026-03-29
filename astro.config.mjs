// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://asaharone.github.io',
  base: '/shaemsha-site/',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  }
});
