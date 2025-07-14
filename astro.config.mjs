// @ts-check
import { defineConfig, fontProviders } from 'astro/config';


import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://ev-od.github.io',
  base: '/portfilio_v1',
  output: 'static',
  trailingSlash: 'ignore',

  build: {
    format: 'directory'
  },
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()],

  experimental: {
    fonts: [{
      provider: fontProviders.google(),
      name: "Geist",
      cssVariable: "--font-geist",
      fallbacks: ["Inter", "sans-serif"],
    }]
  }
});