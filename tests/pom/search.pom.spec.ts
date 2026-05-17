/**
 * Part II — Page Object Model tests
 * Test suite: Search for Books by Keywords
 *
 * Rules:
 *   - No raw selectors in test files — all locators live in page classes
 *   - Use only: getByRole, getByText, getByPlaceholder, getByLabel
 */
import { test } from '../fixtures';

test.describe.configure({ mode: 'serial' });

test.describe('Search for Books by Keywords (POM)', () => {

  test.beforeEach(async ({ home }) => {
    await home.openUrl();
    await home.acceptCookies();
  });

  test('Test no products found', async ({ home }) => {
    await home.searchByKeyword('jaslkfjalskjdkls');
    await home.verifyNoProductsFoundMessage();
  });

  test('Test search results contain keyword', async ({ home }) => {
    await home.searchByKeyword('tolkien');
    await home.verifyResultsCountMoreThan(1);
  });

  test('Test search by ISBN', async ({ home }) => {
    await home.searchByKeyword('9780307588371');
  });

});
