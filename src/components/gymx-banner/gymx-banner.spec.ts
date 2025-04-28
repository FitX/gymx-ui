
import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Banner Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('banner'), { waitUntil: 'networkidle' });
  await expect(page).toHaveScreenshot();
});

