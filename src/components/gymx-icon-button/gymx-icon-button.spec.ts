
import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Icon Button Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('icon-button'), {
    waitForSelector: '.icon-button',
  });
  await expect(page).toHaveScreenshot();
});

  