
import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('App Footer Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('app-footer'), {
    waitForSelector: '.app-footer',
  });
  await expect(page).toHaveScreenshot();
});

  