/**
 * Part II — Page Object Model tests
 * Test suite: Add Books to Shopping Cart
 *
 * Rules:
 *   - No raw selectors in test files — all locators live in page classes
 *   - Use only: getByRole, getByText, getByPlaceholder, getByLabel
 */
import { test } from '../fixtures';
import { expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('Add Books to Shopping Cart (POM)', () => {

  test.beforeEach(async ({ home }) => {
    await home.openUrl();
    await home.acceptCookies();
  });

  test('Test logo is visible', async ({ home }) => {
    await home.verifyLogo();
  });

  test('Test search by keyword', async ({ home }) => {
    await home.searchByKeyword('harry potter');
    await home.verifyResultsCountMoreThan(1);
  });

  test('Test add book to cart', async ({ home }) => {
    await home.searchByKeyword('harry potter');
    await home.addToCartByIndex(0);
    await home.verifyAddToCartMessage();
    await home.closeAddToCartModal();
    await home.verifyCartCount(1);
  });

  test('Test add second book to cart', async ({ home }) => {
    await home.searchByKeyword('harry potter');
    await home.addToCartByIndex(0);
    await home.verifyAddToCartMessage();
    await home.closeAddToCartModal();
    await home.addToCartByIndex(1);
    await home.verifyAddToCartMessage();
    await home.closeAddToCartModal();
    await home.verifyCartCount(2);
  });

  test('Test cart count and sum is correct', async ({ home }) => {
    await home.searchByKeyword('harry potter');
    await home.addToCartByIndex(0);
    await home.verifyAddToCartMessage();
    await home.closeAddToCartModal();
    await home.addToCartByIndex(1);
    await home.verifyAddToCartMessage();
    await home.closeAddToCartModal();

    const cartPage = await home.openShoppingCart();
    await cartPage.verifyCartCount(2);
    await cartPage.verifyCartSumIsCorrect();
  });

  test('Test remove item from cart and counter sum is correct', async ({ home }) => {
    await home.searchByKeyword('harry potter');
    await home.addToCartByIndex(0);
    await home.verifyAddToCartMessage();
    await home.closeAddToCartModal();
    await home.addToCartByIndex(1);
    await home.verifyAddToCartMessage();
    await home.closeAddToCartModal();

    const cartPage = await home.openShoppingCart();
    const basketSumOfTwo = await cartPage.verifyCartSumIsCorrect();

    await cartPage.removeItemByIndex(0);
    await cartPage.verifyCartCount(1);

    const basketSumOfOne = await cartPage.verifyCartSumIsCorrect();
    expect(basketSumOfOne).toBeLessThan(basketSumOfTwo);
  });

});
