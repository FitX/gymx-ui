
import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Toggle Switch Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('toggle-switch'), {
    waitForSelector: '.toggle-switch',
  });
  await expect(page).toHaveScreenshot();
});

  