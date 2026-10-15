import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('OrangeHRM login using POM', () => {
  test('login displays dashboard page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    const dashboardPage = await loginPage.login('Admin', 'admin123');
    await dashboardPage.waitForDashboard();
  });
});
