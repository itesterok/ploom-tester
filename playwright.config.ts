import {defineConfig, devices} from '@playwright/test';
import {getCurrentLocale} from './src/config/locale.config';

const locale = getCurrentLocale();

export default defineConfig({
    testDir: './tests',
    fullyParallel: false, // Run tests sequentially when debugging
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 1, // Use single worker when debugging
    reporter: 'html',
    timeout: 120000,
    use: {
        baseURL: locale.baseDomain, // Use locale-specific base domain
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure', // Record video for all tests, keep only on failure
        headless: !!process.env.CI, // Run headless in CI, visible locally
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                video: 'retain-on-failure', // Explicitly set video for Chromium
            },
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
                video: 'retain-on-failure', // Explicitly set video for Firefox
            },
        },
    ],
});

