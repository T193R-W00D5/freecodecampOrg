import { test, expect } from '@playwright/test';

test.describe('Interactive Features Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pages/interactive-features.html');
  });

  test('should load interactive features page', async ({ page }) => {
    await expect(page).toHaveTitle('Cafe Menu');
    await expect(page.locator('h1')).toHaveText('Interactive Features');
  });

  test('should show message when Click Me button is clicked', async ({ page }) => {
    const messageBtn = page.locator('#messageBtn');
    const messageBox = page.locator('#textMessage');

    // Verify button exists and is clickable
    await expect(messageBtn).toBeVisible();
    await expect(messageBtn).toHaveText('Click Me');

    // Click the button
    await messageBtn.click();

    // Check if message appears (this will depend on your JavaScript implementation)
    // We'll wait a bit for any JavaScript to execute
    await page.waitForTimeout(100);
    
    // Check if the message box is updated
    // Note: This test might need adjustment based on your actual JavaScript behavior
    await expect(messageBox).toBeVisible();
  });

  test('should trigger alert test functionality', async ({ page }) => {
    const alertBtn = page.locator('#alert_test');
    
    // Verify alert button exists
    await expect(alertBtn).toBeVisible();
    await expect(alertBtn).toHaveText('Alert Test');

    // Click the alert test button
    await alertBtn.click();

    // Wait for any snackbar or alert functionality
    await page.waitForTimeout(100);
    
    // Check if snackbar element is present
    const snackbar = page.locator('#snackbar_alert_test');
    await expect(snackbar).toBeVisible();
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    // Check aria-labels
    await expect(page.locator('#messageBtn')).toHaveAttribute('aria-label', 'message_test');
    await expect(page.locator('#alert_test')).toHaveAttribute('aria-label', 'alert_test');
    
    // Check aria-live regions
    await expect(page.locator('#textMessage')).toHaveAttribute('aria-live', 'polite');
    
    // Check tabindex
    await expect(page.locator('#messageBtn')).toHaveAttribute('tabindex', '0');
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Test tab navigation to buttons
    await page.keyboard.press('Tab');
    await expect(page.locator('#messageBtn')).toBeFocused();
    
    // Test Enter key on focused button
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
    
    // Tab to next button
    await page.keyboard.press('Tab');
    await expect(page.locator('#alert_test')).toBeFocused();
  });

  test('should load required JavaScript files', async ({ page }) => {
    // Check if the main script is loaded by looking for network requests
    const scriptRequests = [];
    page.on('request', request => {
      if (request.url().includes('.js')) {
        scriptRequests.push(request.url());
      }
    });

    await page.reload();
    
    // Wait for scripts to load
    await page.waitForTimeout(1000);
    
    // Check if script.js was requested
    const hasMainScript = scriptRequests.some(url => url.includes('script.js'));
    expect(hasMainScript).toBeTruthy();
  });
});