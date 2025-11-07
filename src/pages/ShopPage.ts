import {Locator, Page} from '@playwright/test';
import {BasePage} from './BasePage';
import {ProductPage} from './ProductPage';

export class ShopPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    getProductBySku(sku: string): Locator {
        return this.page.locator(`div[data-sku*="${sku}" i]`);
    }

    async navigateToProductPage(sku: string): Promise<ProductPage> {
        await this.getProductBySku(sku).click();
        await this.page.waitForLoadState();
        return new ProductPage(this.page)
    }
}
