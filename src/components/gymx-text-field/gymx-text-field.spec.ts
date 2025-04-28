import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Text Field Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('form-text-field'), { waitUntil: 'networkidle' });
  await expect(page).toHaveScreenshot();
});
