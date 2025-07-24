import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Rating Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('rating'), { waitUntil: 'networkidle' });
  await expect(page).toHaveScreenshot();
});
