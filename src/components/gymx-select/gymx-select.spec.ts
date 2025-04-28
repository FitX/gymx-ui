import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Select Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('form-select'), { waitUntil: 'networkidle' });
  await expect(page).toHaveScreenshot();
});
