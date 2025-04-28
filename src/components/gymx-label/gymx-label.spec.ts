import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Label Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('form-label'), { waitUntil: 'networkidle' });
  await expect(page).toHaveScreenshot();
});
