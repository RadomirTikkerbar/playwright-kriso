import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { CartPage } from './CartPage';

const homePageUrl = 'https://www.kriso.ee/';
const logoSelector = '.logo-icon';

export class HomePage extends BasePage {
  private readonly url = 'https://www.kriso.ee/';
  private readonly resultsTotal: Locator;
  private readonly addToCartLink: Locator;
  private readonly addToCartMessage: Locator;
  private readonly cartCount: Locator;
  private readonly cartBasketLink: Locator;
  private readonly backButton: Locator;
  private readonly forwardButton: Locator;
  private readonly noResultsMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.resultsTotal = this.page.locator('.sb-results-total').first();
    this.addToCartLink = this.page.getByRole('link', { name: 'Lisa ostukorvi' });
    this.addToCartMessage = this.page.locator('.item-messagebox');
    this.cartCount = this.page.locator('.cart-bubble');
    this.cartBasketLink = this.page.locator('li.fs-basket a[href*="basket.html"]').first();
    this.backButton = this.page.locator('.cartbtn-event.back');
    this.forwardButton = this.page.locator('.cartbtn-event.forward');
    this.noResultsMessage = this.page.locator('.msg.msg-info');
  }

  async openUrl() {
    await this.page.goto(this.url);
  }

  async verifyResultsCountMoreThan(minCount: number) {
    const resultsText = await this.resultsTotal.textContent();
    const total = Number((resultsText || '').replace(/\D/g, '')) || 0;
    expect(total).toBeGreaterThan(minCount);
  }

  async addToCartByIndex(index: number) {
    await this.addToCartLink.nth(index).click();
  }

  async verifyAddToCartMessage() {
    await expect(this.addToCartMessage).toContainText('Toode lisati ostukorvi');
  }

  async closeAddToCartModal() {
    const continueShopping = this.page.getByRole('link', { name: /Jätka ostlemist/i }).first();
    if (await continueShopping.isVisible()) {
      await continueShopping.click();
      await expect(this.page.locator('#wnd-modal-wrapper')).toBeHidden({ timeout: 5000 });
    }
  }

  async verifyCartCount(expectedCount: number) {
    await expect(this.cartCount).toContainText(expectedCount.toString());
  }

  async goBackFromCart() {
    await this.backButton.click();
  }

  async openShoppingCart() {
    const basketLink = this.cartBasketLink;
    const href = await basketLink.getAttribute('href');
    if (!href) {
      throw new Error('Unable to open shopping cart: cart basket link href not found');
    }
    await this.page.goto(href);
    await this.page.waitForLoadState('domcontentloaded');
    return new CartPage(this.page);
  }

  async verifyNoProductsFoundMessage() {
    await expect(this.noResultsMessage).toContainText('Teie poolt sisestatud märksõnale vastavat raamatut ei leitud. Palun proovige uuesti!');
  }
}
