import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Dialog Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('dialog'), { waitUntil: 'networkidle' });
  await expect(page).toHaveScreenshot();
});
