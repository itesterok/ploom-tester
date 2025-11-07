import {Page} from "@playwright/test";
import {WaitersConfig} from "../config/waiters.config";

export class MyCart {
    constructor(private page: Page) {
    }

    async isPresent(): Promise<boolean> {
        return await this.page.locator("button[data-testid=cartIcon]").isVisible({timeout: WaitersConfig.short});
    }

    async isCartEmpty() {
        return this.page.locator(".emptyCartContainer").isVisible({timeout: WaitersConfig.short});
    }

    async getNumberOfProducts(): Promise<number> {
        const numberOfProducts = await this.page.locator("button[data-testid=cartIcon]>span").textContent();
        return parseInt(numberOfProducts || "0");
    }

    async removeAllProducts(): Promise<void> {
        const removeButtons = await this.page.locator('button[data-testid=cartRemoveButton]').all();
        for (const removeButton of removeButtons) {
            await removeButton.click();
        }
    }

    async isProductPresent(searchPattern: string): Promise<boolean | undefined> {
        const products = await this.page.locator('div[data-testid=mini-cart-list]>div>div').all();
        for (const product of products) {
            const productName = await product.textContent();
            return !!productName?.toLowerCase().includes(searchPattern.toLowerCase());
        }
    }
}
