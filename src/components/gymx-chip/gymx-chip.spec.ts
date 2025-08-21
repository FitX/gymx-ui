import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Chip Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('chip'), {
    waitForSelector: '.chip',
  });
  await expect(page).toHaveScreenshot();
});
