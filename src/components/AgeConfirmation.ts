import {Locator, Page} from '@playwright/test';
import {WaitersConfig} from '../config/waiters.config';
import {Cookies} from "./Cookies";

export class AgeConfirmation {
    constructor(private page: Page, private cookies: Cookies) {
    }

    getAcceptButton(): Locator {
        return this.page.locator('div[data-testid=soft-age-verification-dialog] button[data-testid=confirm-button], .ageconfirmation__confirmBtn');
    }

    async confirmAge(): Promise<void> {
        await this.page.waitForLoadState();
        if (await this.cookies.getModalWindow().isVisible({timeout: WaitersConfig.medium})) {
            await this.cookies.handleCookies();
        }
        await this.getAcceptButton().click();
    }
}
