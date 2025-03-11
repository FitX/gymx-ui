
import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Banner Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('banner'), {
    waitForSelector: '.banner',
  });
  await expect(page).toHaveScreenshot();
});

  