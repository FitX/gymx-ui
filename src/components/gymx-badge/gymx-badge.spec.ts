import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Badge Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('badge'), { waitUntil: 'networkidle' });
  await expect(page).toHaveScreenshot();
});
