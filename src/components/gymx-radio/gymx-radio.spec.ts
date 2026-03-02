import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Radio Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('radio'), {
    waitForSelector: '.radio',
  });
  await expect(page).toHaveScreenshot();
});
