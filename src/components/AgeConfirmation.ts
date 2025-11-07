import {Locator, Page} from '@playwright/test';
import {WaitersConfig} from '../config/waiters.config';

export class AgeConfirmation {
    constructor(private page: Page) {
    }

    getAcceptButton(): Locator {
        return this.page.locator('div[data-testid=soft-age-verification-dialog] button[data-testid=confirm-button], .ageconfirmation__confirmBtn');
    }

    async confirmAge(): Promise<void> {
        await this.page.waitForLoadState();
        if (await this.getAcceptButton().isVisible({timeout: WaitersConfig.short})) {
            await this.getAcceptButton().click();
        }
    }
}
