# Playwright E2E Testing Guide

This guide covers everything you need to know about running and debugging Playwright tests in this project.

## Table of Contents
- [Quick Start](#quick-start)
- [Available Commands](#available-commands)
- [Local Development](#local-development)
- [Debugging Tests](#debugging-tests)
- [Writing New Tests](#writing-new-tests)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

## Quick Start

### Prerequisites
- Node.js 22.21.0 (managed by Volta)
- All dependencies installed: `npm install`
- Playwright browsers: `npx playwright install`

### Run Your First Test
```bash
# Run all E2E tests (headless)
npm run test:e2e

# Run tests with browser visible
npm run test:e2e:headed

# Run tests in debug mode
npm run test:e2e:debug
```

## Available Commands

### Unit Tests (Jest)
```bash
npm test                # Run Jest unit tests
npm run test:unit       # Same as above (explicit)
```

### E2E Tests (Playwright)
```bash
npm run test:e2e        # All browsers, headless
npm run test:e2e:headed # All browsers, visible
npm run test:e2e:debug  # Debug mode with pauses
npm run test:e2e:ui     # Interactive UI mode

# Browser-specific tests
npm run test:e2e:chrome    # Chromium only
npm run test:e2e:firefox   # Firefox only
npm run test:e2e:webkit    # WebKit (Safari) only

# Combined tests
npm run test:all        # Unit tests + E2E tests
```

### Direct Playwright Commands
```bash
# Run specific test file
npx playwright test tests/e2e/homepage.spec.js

# Run with specific browser
npx playwright test --project=chromium

# Run with custom options
npx playwright test --headed --max-failures=1

# Generate test report
npx playwright show-report
```

## Local Development

### Project Structure
```
tests/
├── e2e/                    # E2E test files
│   ├── homepage.spec.js    # Homepage tests
│   ├── navigation.spec.js  # Navigation tests
│   └── interactive-features.spec.js
├── fixtures/               # Test data and utilities
└── test-results/          # Generated reports and artifacts
```

### Server Configuration
- **Base URL**: `http://localhost:3010`
- **Auto-start**: Server starts automatically during tests
- **Manual start**: `npm start` (if needed for debugging)

### Test Configuration
Key settings in `playwright.config.js`:
- **Parallel execution**: Tests run in parallel for speed
- **Retries**: 2 retries on CI, 0 locally
- **Timeouts**: 30s test timeout, 5s assertion timeout
- **Screenshots**: Only on failure
- **Videos**: Retained on failure
- **Traces**: On first retry

## Debugging Tests

### Visual Debugging
```bash
# Debug mode - browser stays open, step through tests
npm run test:e2e:debug

# Headed mode - see browser actions
npm run test:e2e:headed

# UI mode - interactive test runner
npm run test:e2e:ui
```

### Step-by-Step Debugging
1. **Add breakpoints** in your test code:
   ```javascript
   await page.pause(); // Pauses execution
   ```

2. **Run in debug mode**:
   ```bash
   npm run test:e2e:debug
   ```

3. **Use browser developer tools** when paused

### Inspecting Elements
```bash
# Generate selectors interactively
npx playwright codegen localhost:3010
```

### Trace Viewer
```bash
# View traces for failed tests
npx playwright show-trace test-results/[test-name]/trace.zip
```

## Writing New Tests

### Test File Template
```javascript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/your-page');
  });

  test('should do something', async ({ page }) => {
    // Your test code here
    await expect(page.locator('selector')).toBeVisible();
  });
});
```

### Best Practices
1. **Use descriptive test names**
2. **Group related tests** with `test.describe()`
3. **Use `beforeEach`** for common setup
4. **Prefer stable selectors** (data-testid, role, text)
5. **Wait for elements** before interacting
6. **Add assertions** to verify state changes

### Common Patterns
```javascript
// Navigation
await page.goto('/path');
await page.click('button');
await page.fill('input', 'value');

// Waiting
await page.waitForSelector('selector');
await page.waitForURL('**/path/**');
await page.waitForResponse(response => response.url().includes('api'));

// Assertions
await expect(page).toHaveTitle('Title');
await expect(page.locator('selector')).toBeVisible();
await expect(page.locator('selector')).toHaveText('Text');
```

## CI/CD Integration

### GitHub Actions Workflows
- **`e2e-tests.yml`**: Runs E2E tests on push/PR
- **`ci.yml`**: Code quality and security checks

### Workflow Features
- **Matrix testing**: Runs across multiple browsers
- **Artifact collection**: Test results and screenshots
- **Volta integration**: Uses pinned Node.js version
- **Conditional execution**: Full tests only on main branch

### Local CI Simulation
```bash
# Simulate CI environment
CI=true npm run test:e2e

# Test specific browser like CI
npx playwright test --project=chromium
```

## Troubleshooting

### Common Issues

#### Server Not Starting
```bash
# Check if port 3010 is in use
netstat -ano | findstr :3010

# Kill existing process
taskkill /PID <process_id> /F

# Start server manually
npm start
```

#### Browser Installation Issues
```bash
# Reinstall browsers
npx playwright install

# Install system dependencies (Linux/WSL)
npx playwright install-deps
```

#### Test Timeouts
1. **Increase timeout** in `playwright.config.js`
2. **Use explicit waits** instead of fixed delays
3. **Check server performance**

#### Flaky Tests
1. **Add proper wait conditions**
2. **Use `toBeVisible()` instead of `toHaveCount()`**
3. **Increase retry count** for CI

#### VS Code Integration Issues
```bash
# Restart TypeScript server
Ctrl+Shift+P > "TypeScript: Restart TS Server"

# Reload VS Code window
Ctrl+Shift+P > "Developer: Reload Window"
```

### Debug Commands
```bash
# Check Playwright installation
npx playwright --version

# List available browsers
npx playwright install --dry-run

# Validate configuration
npx playwright test --list

# Check system info
npx playwright show-system
```

### Getting Help
1. **Check test artifacts** in `test-results/`
2. **View HTML report**: `npx playwright show-report`
3. **Enable verbose logging**: `DEBUG=pw:* npm run test:e2e`
4. **Consult Playwright docs**: https://playwright.dev/docs

### Performance Tips
1. **Run tests in parallel**: Default configuration
2. **Use `--max-failures=1`** for quick feedback
3. **Filter tests**: `npx playwright test --grep "homepage"`
4. **Skip heavy tests**: Use `test.skip()` temporarily

## Environment Variables

Set these in your shell or `.env` file:

```bash
# Force headless mode
HEADLESS=true

# Set custom timeout
TIMEOUT=60000

# Enable debug logging
DEBUG=pw:*

# CI mode
CI=true
```

## Next Steps

1. **Write more tests** for your specific features
2. **Set up IDE integration** (VS Code Playwright extension)
3. **Configure test data** management
4. **Add visual regression testing** with screenshots
5. **Implement accessibility testing** with axe-core

---

For more advanced usage, see the [official Playwright documentation](https://playwright.dev/docs).