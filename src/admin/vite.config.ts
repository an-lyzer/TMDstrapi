import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) =>
  mergeConfig(config, {
    resolve: {
      // Share the same Auth, GuidedTour and admin API instances across plugins.
      dedupe: ['@strapi/strapi', '@strapi/admin'],
    },
  });
