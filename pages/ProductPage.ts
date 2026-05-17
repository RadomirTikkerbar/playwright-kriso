import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  private readonly productTitle: Locator;
  private readonly addToCartLink: Locator;

  constructor(private page: Page) {
    this.productTitle = this.page.locator('h1').first();
    this.addToCartLink = this.page.getByRole('link', { name: /Lisa ostukorvi/i }).first();
  }

  async verifyProductTitleContains(keyword: string) {
    await expect(this.productTitle).toContainText(keyword, { timeout: 10000 });
  }

  async addToCart() {
    await this.addToCartLink.click();
  }
}
