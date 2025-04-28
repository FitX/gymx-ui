import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('App Header Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('layout-app-header'), { waitUntil: 'networkidle' });
  await expect(page).toHaveScreenshot();
});
