import {Locator, Page} from '@playwright/test';
import {WaitersConfig} from '../config/waiters.config';

export class Cookies {
    constructor(private page: Page) {
    }

    getRejectAllButton(): Locator {
        return this.page.locator('div#onetrust-button-group>#onetrust-reject-all-handler');
    }

    async handleCookies(): Promise<void> {
        await this.page.waitForLoadState();
        if (await this.getRejectAllButton().isVisible({timeout: WaitersConfig.short})) {
            await this.getRejectAllButton().click();
        }
    }
}
