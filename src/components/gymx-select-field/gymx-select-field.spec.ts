import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Select Field Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('form-select-field'), { waitUntil: 'networkidle' });
  await expect(page).toHaveScreenshot();
});
