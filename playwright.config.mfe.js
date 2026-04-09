import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/microfrontend',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: [
    {
      command: 'cd shell && npm run dev',
      port: 3000,
      reuseExistingServer: true,
    },
    {
      command: 'cd playground/react && npm run dev',
      port: 3001,
      reuseExistingServer: true,
    },
    {
      command: 'cd playground/next && npm run dev',
      port: 3003,
      reuseExistingServer: true,
    },
  ],
});
