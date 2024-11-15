
import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('App Layout Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('app-layout'), {
    waitForSelector: '.app-layout',
  });
  await expect(page).toHaveScreenshot();
});

  