import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://OSIX-Tech.github.io',
  base: '/Landingv2/',
  integrations: [tailwind(), 
    react()
  ],
});