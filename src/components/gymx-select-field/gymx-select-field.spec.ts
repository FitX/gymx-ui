
import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Select Field Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('select-field'), {
    waitForSelector: '.select-field',
  });
  await expect(page).toHaveScreenshot();
});

  