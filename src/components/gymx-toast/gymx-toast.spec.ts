
import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Toast Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('toast'), {
    waitForSelector: '.toast',
  });
  await expect(page).toHaveScreenshot();
});

