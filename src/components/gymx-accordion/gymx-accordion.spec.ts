
import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Accordion Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('accordion'), {
    waitForSelector: '.accordion',
  });
  await expect(page).toHaveScreenshot();
});

  