import type { StorybookConfig } from '@storybook/web-components-vite';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const ENV_CLIENT_ID = 'STORYBOOK_ENTRA_CLIENT_ID';
const ENV_TENANT_ID = 'STORYBOOK_ENTRA_TENANT_ID';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/web-components-vite',
  managerEntries: [join(__dirname, 'manager.ts')],
  viteFinal: (config) => {
    config.define = {
      ...config.define,
      [`process.env.${ENV_CLIENT_ID}`]: JSON.stringify(process.env[ENV_CLIENT_ID] ?? ''),
      [`process.env.${ENV_TENANT_ID}`]: JSON.stringify(process.env[ENV_TENANT_ID] ?? 'common'),
    };
    return config;
  },
};
export default config;