import {Locator, Page} from '@playwright/test';
import type {ShopPage} from "../pages/ShopPage";

export class TopNavigationMenu {
    constructor(private page: Page) {
    }

    getShopLink(): Locator {
        return this.page.locator('a', {hasText: /(Shop|Каталог|Sklep|Tienda|Izdelki)/i}).first();
    }

    async navigateToShopPage(): Promise<ShopPage> {
        await this.getShopLink().click();
        await this.page.waitForLoadState();
        const {ShopPage} = await import ('../pages/ShopPage');
        return new ShopPage(this.page);
    }
}
