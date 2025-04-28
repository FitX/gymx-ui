
import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Toggle Switch Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('form-toggle-switch'), { waitUntil: 'networkidle' });
  await expect(page).toHaveScreenshot();
});

