
import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Text Field Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('text-field'), {
    waitForSelector: '.text-field',
  });
  await expect(page).toHaveScreenshot();
});

  