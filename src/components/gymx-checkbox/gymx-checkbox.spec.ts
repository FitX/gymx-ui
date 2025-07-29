
import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Checkbox Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('checkbox'), {
    waitForSelector: '.checkbox',
  });
  await expect(page).toHaveScreenshot();
});

  