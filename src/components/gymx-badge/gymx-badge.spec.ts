
import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Badge Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('badge'), {
    waitForSelector: '.badge',
  });
  await expect(page).toHaveScreenshot();
});

  