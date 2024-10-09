
import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Notification Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('notification'), {
    waitForSelector: '.notification',
  });
  await expect(page).toHaveScreenshot();
});

  