import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('App Layout Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('layout-app-layout'), { waitUntil: 'networkidle' });
  await expect(page).toHaveScreenshot();
});
