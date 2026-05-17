/**
 * Part I — Flat tests (no POM)
 * Test suite: Navigate Products via Filters
 *
 * Rules:
 *   - Use only: getByRole, getByText, getByPlaceholder, getByLabel
 *   - No CSS class selectors, no XPath
 *
 * Tip: run `npx playwright codegen https://www.kriso.ee` to discover selectors.
 */
import { test, expect } from '@playwright/test';

test.describe('Navigate Products via Filters', () => {

  test.beforeAll(async ({ browser }) => {
    // Setup if needed
  });

  test('Test filter products and verify results', async ({ page }) => {
    await page.goto('https://www.kriso.ee/');
    await page.getByRole('button', { name: 'Nõustun' }).click();

    // Perform search
    await page.getByRole('textbox', { name: 'Pealkiri, autor, ISBN, märksõna' }).click();
    await page.getByRole('textbox', { name: 'Pealkiri, autor, ISBN, märksõna' }).fill('tolkien');
    await page.getByRole('button', { name: 'Search' }).click();

    // Verify results
    const resultsCount = await page.locator('.sb-results-total').first().textContent();
    expect(resultsCount).toBeTruthy();
  });

});
