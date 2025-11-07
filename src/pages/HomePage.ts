import {Page} from '@playwright/test';
import {BasePage} from './BasePage';
import {getLocaleConfig, LocaleCode} from '../config/locale.config';

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    static async navigateTo(page: Page, localeCode: LocaleCode): Promise<HomePage> {
        const locale = getLocaleConfig(localeCode);
        await page.goto(locale.baseDomain + locale.paths.home);
        await page.waitForLoadState();
        return new HomePage(page);
    }
}
