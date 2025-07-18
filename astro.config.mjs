// @ts-check
import { defineConfig, fontProviders } from 'astro/config';


import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://lamichhanerabin.com.np',
  output: 'static',
  trailingSlash: 'ignore',

  build: {
    format: 'directory'
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  },

  integrations: [react()],

  experimental: {
    fonts: [{
      provider: fontProviders.google(),
      name: "Geist",
      cssVariable: "--font-geist",
      fallbacks: ["Inter", "sans-serif"],
    }]
  },
       server: {
        host: '0.0.0.0'
      }
});