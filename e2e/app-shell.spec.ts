import { expect, test } from '@playwright/test';

test('loads the application shell', async ({ page }) => {
  await page.route('**/env.js', (route) =>
    route.fulfill({
      contentType: 'application/javascript',
      body: "window.__env = { ENVIRONMENT: 'local', KEYCLOAK_ENABLED: false, configEndpoint: false };",
    })
  );

  await page.goto('/');

  await expect(page).toHaveTitle(/A&R Admin/);
  await expect(page.locator('app-root')).toBeVisible();
});
