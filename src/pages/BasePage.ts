import {Page} from '@playwright/test';
import {TopNavigationMenu} from '../components/TopNavigationMenu';
import {Cookies} from '../components/Cookies';
import {AgeConfirmation} from '../components/AgeConfirmation';
import {MyCart} from "../components/MyCart";

export class BasePage {
    protected navigationMenu: TopNavigationMenu;
    protected myCartFragment: MyCart;
    protected cookies: Cookies;
    protected ageConfirmation: AgeConfirmation;

    constructor(protected page: Page) {
        this.navigationMenu = new TopNavigationMenu(page);
        this.cookies = new Cookies(page);
        this.ageConfirmation = new AgeConfirmation(page, this.cookies);
        this.myCartFragment = new MyCart(page);
        this.setupPossibleOverlaysHandlers();
    }

    async getNavigationMenu(): Promise<TopNavigationMenu> {
        return this.navigationMenu;
    }

    async getMyCart(): Promise<MyCart> {
        return this.myCartFragment;
    }

    private async setupPossibleOverlaysHandlers(): Promise<void> {
        await this.page.addLocatorHandler(
            this.cookies.getModalWindow(), async () => {
                await this.cookies.handleCookies();
            }
        );

        await this.page.addLocatorHandler(
            this.ageConfirmation.getAcceptButton(), async () => {
                await this.ageConfirmation.confirmAge();
            }
        );
    }
}
