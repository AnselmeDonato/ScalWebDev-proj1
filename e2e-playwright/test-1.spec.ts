import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:7800/');
  await page.getByTestId('writeCode').click();
  await page.getByTestId('writeCode').fill('This ain');
  await page.getByTestId('gradingResult').click();
  await page.getByText('Traceback (most recent call').click();
});