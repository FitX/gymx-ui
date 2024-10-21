
import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Select Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('select'), {
    waitForSelector: '.select',
  });
  await expect(page).toHaveScreenshot();
});

  