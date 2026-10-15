import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly dashboardHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardHeader = page.locator('h6.oxd-topbar-header-breadcrumb-module');
  }

  async waitForDashboard() {
    await expect(this.page).toHaveURL(/\/dashboard\/index$/);
    await expect(this.dashboardHeader).toContainText('Dashboard');
  }
}
