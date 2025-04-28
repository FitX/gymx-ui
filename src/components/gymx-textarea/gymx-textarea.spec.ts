
import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Textarea Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('form-textarea'), { waitUntil: 'networkidle' });
  await expect(page).toHaveScreenshot();
});

