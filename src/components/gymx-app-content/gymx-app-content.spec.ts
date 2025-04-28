import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('App Content Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('layout-app-content'), { waitUntil: 'networkidle' });
  await expect(page).toHaveScreenshot();
});
