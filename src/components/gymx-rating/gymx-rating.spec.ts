
import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Rating Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('rating'), {
    waitForSelector: '.rating',
  });
  await expect(page).toHaveScreenshot();
});

  