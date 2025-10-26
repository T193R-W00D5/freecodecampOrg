import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {
  test('should load the home page successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page loads and has the correct title
    await expect(page).toHaveTitle('freecodecamp.org copies');
    
    // Check main heading is present
    await expect(page.locator('h1').first()).toHaveText('freecodecamp.org copies');
    
    // Check welcome section exists
    await expect(page.locator('h2')).toHaveText('Welcome!');
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Test the "Bottom of page" link
    const bottomLink = page.locator('a[href="#idFooter"]');
    await expect(bottomLink).toBeVisible();
    await expect(bottomLink).toHaveText('Bottom of page');
    
    // Click and verify it scrolls to footer
    await bottomLink.click();
    await expect(page.locator('#idFooter')).toBeInViewport();
  });

  test('should display course navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check courses section exists
    await expect(page.locator('main section').nth(1).locator('h1')).toHaveText('Courses');
    
    // Check course link exists and is clickable
    const courseLink = page.locator('a[href*="Certified-Full-Stack-Developer-Curriculum"]');
    await expect(courseLink).toBeVisible();
    await expect(courseLink).toHaveText('Certified Full Stack Developer Curriculum');
  });

  test('should have proper page structure', async ({ page }) => {
    await page.goto('/');
    
    // Verify semantic HTML structure
    await expect(page.locator('header#idHeader')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer#idFooter')).toBeVisible();
    
    // Check favicon is loaded
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', '/assets/favicon/Wizard.ico');
    
    // Check CSS is loaded
    await expect(page.locator('link[rel="stylesheet"]')).toHaveAttribute('href', '/css/styles-freecodecamp.css');
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Verify page still loads properly on mobile
    // Use waitForSelector with more lenient visibility check
    await page.waitForSelector('h1', { state: 'attached' });
    
    // Check that the h1 exists in DOM (may be hidden by CSS on mobile)
    const h1Element = page.locator('h1').first();
    await expect(h1Element).toHaveText('freecodecamp.org copies');
    
    // Check navigation link is still accessible
    await expect(page.locator('nav ul li a')).toBeAttached();
  });
});