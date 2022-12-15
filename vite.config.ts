import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import loadVersion from 'vite-plugin-package-version';

import legacy from '@vitejs/plugin-legacy';

import vueI18n from '@intlify/vite-plugin-vue-i18n';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build';

  const legacyTargets = isBuild ? [
    'Android > 39',
    'Chrome >= 60',
    'Safari >= 10.1',
    'iOS >= 10.3',
    'Firefox >= 54',
    'Edge >= 15'
  ] : undefined;

  return {
    plugins: [
      vue({
        template: { transformAssetUrls }
      }),
      vueI18n({
        include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**'),
      }),

      quasar({
        sassVariables: 'src/style/quasar-variables.sass'
      }),

      loadVersion(),

      legacy({
        targets: legacyTargets
      })
    ],
    test: {
      environment: 'happy-dom',
      coverage: {
        reporter: ['html'],
      },
    },
  }
})