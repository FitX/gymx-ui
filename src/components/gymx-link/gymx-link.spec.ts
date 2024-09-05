
import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Link Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('link'));
  await expect(page).toHaveScreenshot();
});

  