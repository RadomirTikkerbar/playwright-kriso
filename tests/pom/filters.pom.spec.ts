/**
 * Part II — Page Object Model tests
 * Test suite: Navigate Products via Filters
 *
 * Rules:
 *   - No raw selectors in test files — all locators live in page classes
 *   - Use only: getByRole, getByText, getByPlaceholder, getByLabel
 */
import { test } from '../fixtures';

test.describe.configure({ mode: 'serial' });

test.describe('Navigate Products via Filters (POM)', () => {

  test.beforeEach(async ({ home }) => {
    await home.openUrl();
    await home.acceptCookies();
  });

  test('Test filter products and verify results', async ({ home }) => {
    await home.searchByKeyword('tolkien');
    await home.verifyResultsCountMoreThan(0);
  });

});
