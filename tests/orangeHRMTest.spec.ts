import { test, expect } from '@playwright/test';

test('OrangeHRM add employee flow', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com');

  await page.locator('input[name="username"]').fill('Admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('link', { name: 'PIM' }).click();

  await page.waitForTimeout(5000);
  //await page.locator('a:has-text("Employee List")').click();

  await page.getByRole('button', { name: 'Add Employee' }).click();

  await page.locator('input[name="firstName"]').fill('John1234');
  await page.locator('input[name="lastName"]').fill('Doe4567');
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
  await expect(page.locator('body')).toContainText('John1234 Doe4567');
});
