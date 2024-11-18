
import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('App Header Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('app-header'), {
    waitForSelector: '.app-header',
  });
  await expect(page).toHaveScreenshot();
});

  