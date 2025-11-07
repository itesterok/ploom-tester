import {Page, Locator} from '@playwright/test';
import {BasePage} from './BasePage';
import {WaitersConfig} from '../config/waiters.config';
import {TopNavigationMenu} from "../components/TopNavigationMenu";
import {Cookies} from "../components/Cookies";
import {AgeConfirmation} from "../components/AgeConfirmation";
import {MyCart} from "../components/MyCart";

export class ProductPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async addThisProductToMyCart(): Promise<void> {
        await this.page.locator("button[data-event-selector=product-details-add-product-button]").click();
    }
}
