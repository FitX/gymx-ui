
import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Tabs Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('tabs'), {
    waitForSelector: '.tabs',
  });
  await expect(page).toHaveScreenshot();
});

  