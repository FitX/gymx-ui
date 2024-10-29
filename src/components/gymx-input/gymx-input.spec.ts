import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Input Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('form-input'), {
    waitForSelector: '.input',
  });
  await expect(page).toHaveScreenshot();
});
