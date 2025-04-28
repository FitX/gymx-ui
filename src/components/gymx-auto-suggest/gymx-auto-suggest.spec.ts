import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Auto Suggest Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('auto-suggest'), { waitUntil: 'networkidle' });
  await expect(page).toHaveScreenshot();
});
