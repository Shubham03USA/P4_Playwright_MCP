import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

test.describe('OrangeHRM login data-driven tests', () => {
  const csvPath = path.join(__dirname, '..', 'test_data', 'loginData.csv');
  const fileContent = fs.readFileSync(csvPath, 'utf8');
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as Array<{ Username: string; Password: string; Expected: string }>;

  for (const row of records) {
    test(`login with ${row.Username} => ${row.Expected}`, async ({ page }) => {
      console.log(`Running dataset: Username=${row.Username}, Expected=${row.Expected}`);

      await page.goto('https://opensource-demo.orangehrmlive.com');

      const usernameInput = page.locator('input[name="username"]');
      const passwordInput = page.locator('input[name="password"]');
      const loginButton = page.locator('button[type="submit"]');

      await expect(usernameInput).toBeVisible();
      await usernameInput.fill(row.Username);
      await passwordInput.fill(row.Password);
      await loginButton.click();

      if (row.Expected === 'Dashboard') {
        await expect(page.locator('h6.oxd-topbar-header-breadcrumb-module')).toContainText('Dashboard');
        console.log(`PASS: ${row.Username} logged in successfully.`);
      } else if (row.Expected === 'Invalid credentials') {
        await expect(page.locator('p.oxd-text.oxd-text--p.oxd-alert-content-text')).toContainText('Invalid credentials');
        console.log(`PASS: ${row.Username} correctly showed invalid credentials.`);
      } else {
        throw new Error(`Unexpected Expected value: ${row.Expected}`);
      }
    });
  }
});
