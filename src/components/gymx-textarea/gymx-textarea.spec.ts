
import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Textarea Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('textarea'), {
    waitForSelector: '.textarea',
  });
  await expect(page).toHaveScreenshot();
});

  