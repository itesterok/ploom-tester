import {Locator, Page} from '@playwright/test';

export class Cookies {
    constructor(private page: Page) {
    }

    getModalWindow(): Locator {
        return this.page.locator(".onetrust-pc-dark-filter");
    }

    getRejectAllButton(): Locator {
        return this.page.locator('div#onetrust-button-group>#onetrust-reject-all-handler');
    }

    async handleCookies(): Promise<void> {
        await this.page.waitForLoadState();
        await this.getRejectAllButton().click();
    }
}
