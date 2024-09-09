import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Button Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('button'), {
    waitForSelector: '.button',
  });
  await expect(page).toHaveScreenshot();
});
