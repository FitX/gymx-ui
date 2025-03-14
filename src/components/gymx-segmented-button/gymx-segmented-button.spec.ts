
import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Segmented Button Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('segmented-button'), {
    waitForSelector: '.segmented-button',
  });
  await expect(page).toHaveScreenshot();
});

  