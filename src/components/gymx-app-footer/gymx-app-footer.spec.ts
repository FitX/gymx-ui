import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('App Footer Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('layout-app-footer'), { waitUntil: 'networkidle' });
  await expect(page).toHaveScreenshot();
});
