import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://127.0.0.1:4200',
  },
  webServer: {
    command: 'yarn start --host 127.0.0.1',
    url: 'http://127.0.0.1:4200',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
