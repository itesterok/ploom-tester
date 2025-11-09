# Ploom Tester

A **demonstration test automation framework** built with **Playwright** and **TypeScript**, showcasing testing practices including Page Object Model pattern, component-based architecture, and multi-market testing support.

## Project Structure

```
src/
├── components/    # Reusable UI components (Cookies, AgeConfirmation, MyCart, etc.)
├── pages/         # Page Object Model classes (BasePage, HomePage, ProductPage, ShopPage)
├── config/        # Configuration files (locale, waiters)
└── fixtures/      # Playwright test fixtures

tests/              # Test specifications
```

## Setup

```bash
npm install
```

## Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run with UI mode (interactive)
npm run test:ui

# Run specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run specific market
npm run test:uk
npm run test:pl
npm run test:sl
npm run test:all-markets

# Combine browser and market
npm run test:uk:chromium
npm run test:pl:firefox
```

## Debugging

### Debug Mode
Run tests in debug mode with Playwright Inspector:

```bash
npm run test:debug
```

This will:
- Open Playwright Inspector
- Pause execution at breakpoints
- Allow step-by-step debugging
- Show browser DevTools

### UI Mode (Recommended for Debugging)
Interactive test runner with time-travel debugging:

```bash
npm run test:ui
```

Features:
- Visual test execution
- Step through tests
- Inspect page state at any point
- Watch tests run in real-time

## Docker

### Build Image

```bash
docker build -t ploom-tester .
```

### Run Tests in Docker

```bash
# Run all tests
docker run --rm ploom-tester

# Run specific market
docker run --rm -e MARKETS=uk ploom-tester npm run test:uk

# Run specific browser and market
docker run --rm -e MARKETS=uk ploom-tester npm run test:uk:chromium

# Mount volumes to access test results and reports on your host machine
docker run --rm \
  -e MARKETS=uk \
  -v $(pwd)/test-results:/app/test-results \
  -v $(pwd)/playwright-report:/app/playwright-report \
  ploom-tester npm run test:uk
```

**Note:** Use volume mounts (`-v`) to save test results and reports to your host machine. Without volumes, results are only available inside the container.

## GitHub Actions

You can run tests using GitHub Actions with customizable parameters. The workflow publishes test results to GitHub Pages.

### Running Tests via GitHub Actions

1. Go to the **Actions** tab in your GitHub repository
2. Select **Run E2E Tests** workflow
3. Click **Run workflow**
4. Configure parameters:
   - **Market**: Choose from `all-markets`, `uk`, `pl`, or `sl` (default: `uk`)
   - **Browser**: Choose from `all`, `chromium`, or `firefox` (default: `chromium`)
5. Click **Run workflow**

### Viewing Test Results

After the workflow completes, test results are automatically published to GitHub Pages. The report URL will be displayed in the workflow run output and follows this format:

```
https://itesterok.github.io/ploom-tester/{YYYY-MM-DD-HH-MM}/index.html
```

Where `{YYYY-MM-DD-HH-MM}` is a timestamp folder created for each run.

**Note:** The report URL is also printed as a notice in the workflow run summary for easy access.

## Test Reports

View HTML test reports:

```bash
npm run report
```

Reports are generated in `playwright-report/` directory after test execution.

