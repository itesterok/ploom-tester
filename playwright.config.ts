import {defineConfig, devices} from '@playwright/test';
import {getCurrentLocale} from './src/config/locale.config';

const locale = getCurrentLocale();

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 2 : undefined,
    reporter: [['html', { open: 'never' }]],
    timeout: 60000,
    use: {
        baseURL: locale.baseDomain,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        headless: !!process.env.CI, // Run headless in CI, visible locally
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                video: 'retain-on-failure',
                // Docker-friendly launch args for Chromium
                launchOptions: {
                    args: ['--no-sandbox', '--disable-setuid-sandbox'],
                },
            },
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
                video: 'retain-on-failure',
                // Docker-friendly launch args for Firefox
                launchOptions: {
                    args: ['--no-sandbox'],
                },
            },
        },
    ],
});

