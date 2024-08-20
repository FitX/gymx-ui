import { test, expect } from '@playwright/test';
import { getUrlByStorybookId } from '../../../utils/e2e-helper';

test('Error Message Snapshot', async ({ page }) => {
  await page.goto(getUrlByStorybookId('form-error-message'));
  await expect(page).toHaveScreenshot();
});
